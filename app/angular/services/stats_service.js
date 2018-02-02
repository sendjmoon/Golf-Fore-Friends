'use strict';

module.exports = function(app) {
  app.factory('StatsService', ['$rootScope', '$http', 'UserService', 'ResultService', function($rs, $http, userService, resultService) {

    const data = {};

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

    const getByDocOrUserId = function(docOrUserId) {
      return new Promise((resolve, reject) => {
        $http.get(`${$rs.baseUrl}/users/stats/${docOrUserId}`)
          .then((userStats) => {
            userService.data.user.stats = userStats.data;
            resolve();
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
        if (handicap || result.winRatio || result.winRatio === 0) updateOptions = result;

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

    const updateHandicap = function(docOrUserId) {
      return new Promise((resolve, reject) => {
        let matchOptions = {
          playerId: docOrUserId,
        };
        let groupOptions = {
          _id: null,
          handicapActual: {
            $avg: '$strokes',
          },
        };
        resultService.aggregate(matchOptions, groupOptions)
          .then((aggregatedData) => {
            let handicapActual = aggregatedData[0].handicapActual;
            let updateData = {
              handicap: Math.ceil(handicapActual),
              handicapActual: handicapActual,
            };
            updateByDocOrUserId(docOrUserId, updateData, true)
              .then(resolve);
          })
          .catch(reject);
      });
    };

    const updateWinRatio = function(docOrUserId) {
      return new Promise((resolve, reject) => {
        let totalWins = 0;
        let totalLosses = 0;
        let updateData = {};
        let matchOptions = {
          playerId: docOrUserId,
        };
        let groupOptions = {
          _id: null,
        };

        //TODO: make modular, mitigate redundancies
        matchOptions.result = 'win';
        groupOptions.wins = { $sum: 1 };
        resultService.aggregate(matchOptions, groupOptions)
          .then((sumWins) => {
            sumWins.length < 1 ? totalWins = 0 : totalWins = sumWins[0].wins;
            matchOptions.result = 'loss';
            groupOptions.losses = { $sum: 1 };
            resultService.aggregate(matchOptions, groupOptions)
              .then((sumLosses) => {
                sumLosses.length < 1 ? totalLosses = 0 : totalLosses = sumLosses[0].losses;
                updateData.winRatio = (totalWins / (totalWins + totalLosses));
                updateByDocOrUserId(docOrUserId, updateData)
                  .then(resolve);
              })
          })
          .catch(reject);
      });
    };

    return {
      create: create,
      getByDocOrUserId: getByDocOrUserId,
      updateByDocOrUserId: updateByDocOrUserId,
      updateManyByDocOrUserId: updateManyByDocOrUserId,
      updateHandicap: updateHandicap,
      updateWinRatio: updateWinRatio,
      data: data,
    };
  }]);
};
