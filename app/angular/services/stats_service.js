'use strict';

module.exports = function(app) {
  app.factory('StatsService', ['$rootScope', '$http', 'UserService', function($rs, $http, userService) {

    const create = function(userId) {
      return new Promise((resolve, reject) => {
        const userData = {
          userId: userId,
        };
        $http.post(`${$rs.baseUrl}/users/stats/create`, userData)
          .then((newStatsId) => {
            resolve(newStatsId.data);
          })
          .catch(reject);
      });
    };

    //TODO: refactor arguments to make modular for different types of requests
    const updateByDocOrUserId = function(docOrUserId, result, handicap) {
      return new Promise((resolve, reject) => {
        let updateData = {};
        let updateOptions = {};
        handicap = handicap || false;

        if (result === 'solo') updateOptions = { $inc: { solo: 1}};
        if (result === 'win') updateOptions = { $inc: { wins: 1 }};
        if (result === 'loss') updateOptions = { $inc: { losses: 1 }};
        if (result === 'tie') updateOptions = { $inc: { ties: 1 }};
        if (handicap || result.winRatio) updateOptions = result;

        updateData.docOrUserId = docOrUserId;
        updateData.updateOptions = updateOptions;

        $http.post(`${$rs.baseUrl}/users/stats/update`, updateData)
          .then(resolve)
          .catch(reject);
      });
    };

    //TODO: async forEach? return an error if any one of them has an error
    const updateManyByDocOrUserId = function(resultsArray) {
      return new Promise((resolve, reject) => {
        resultsArray.forEach((result) => {
          updateByDocOrUserId(result.playerId, result.result);
        });
        resolve();
      });
    };

    const aggregate = function(matchOptions, groupOptions) {
      return new Promise((resolve, reject) => {
        let aggregateData = {
          matchOptions: JSON.stringify(matchOptions),
          groupOptions: JSON.stringify(groupOptions),
        };
        $http.post(`${$rs.baseUrl}/games/result/aggregate`, aggregateData)
          .then((aggregatedData) => {
            resolve(aggregatedData.data);
          })
          .catch(reject);
      });
    };

    const updateHandicap = function(docOrUserId) {
      return new Promise((resolve, reject) => {
        let matchOptions = {
          playerId: docOrUserId,
        };
        let groupOptions = {
          _id: null,
          handicapActual: {
            $sum: 1,
          },
        };
        aggregate(matchOptions, groupOptions)
          .then((aggregatedData) => {
            let handicapActual = aggregatedData[0].handicapActual;
            let updateData = {
              handicap: Math.floor(handicapActual),
              handicapActual: handicapActual,
            };
            updateByDocOrUserId(docOrUserId, updateData, true)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
    };

    const updateWinRatio = function(docOrUserId) {
      return new Promise((resolve, reject) => {
        let totalWins = 0;
        let totalLosses = 0;
        let totalTies = 0;
        let totalGames = 0;
        let winRatio = 0;

        let matchOptions = {
            playerId: docOrUserId,
        };
        let groupOptions = {
          _id: null,
        };

        matchOptions.result = 'win';
        groupOptions.wins = { $sum: 1 };
        aggregate(matchOptions, groupOptions)
          .then((sumWins) => {
            sumWins.length < 1 ?
              totalWins = 0 : totalWins = sumWins[0].wins;

            matchOptions.result = 'loss';
            groupOptions.losses = { $sum: 1 };
            aggregate(matchOptions, groupOptions)
              .then((sumLosses) => {
                sumLosses.length < 1 ?
                  totalLosses = 0 : totalLosses = sumLosses[0].losses;

                matchOptions.result = 'tie';
                groupOptions.ties = { $sum: 1 };
                aggregate(matchOptions, groupOptions)
                  .then((sumTies) => {
                    sumTies.length < 1 ?
                      totalTies = 0 : totalTies = sumTies[0].ties;

                    totalGames = totalWins + totalLosses + totalTies;
                    winRatio = (totalWins + (0.5 * totalTies)) / totalGames;

                    let updateData = {
                      winRatio: winRatio,
                    };

                    updateByDocOrUserId(docOrUserId, updateData)
                      .then(resolve)
                      .catch(reject);
                  })
                  .catch(reject);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    };

    return {
      create: create,
      updateByDocOrUserId: updateByDocOrUserId,
      updateManyByDocOrUserId: updateManyByDocOrUserId,
      aggregate: aggregate,
      updateHandicap: updateHandicap,
      updateWinRatio: updateWinRatio,
    }
  }]);
}
