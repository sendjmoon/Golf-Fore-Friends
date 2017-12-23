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
        if (handicap) updateOptions = result;

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
        const aggregateData = {
          userId: docOrUserId,
          options: {
            $group: { _id: null, handicapActual: { $avg: '$strokes' }},
          },
        };
        aggregateData.options = JSON.stringify(aggregateData.options);
        $http.post(`${$rs.baseUrl}/games/result/aggregate`, aggregateData)
          .then((handicapActual) => {
            handicapActual = handicapActual.data[0].handicapActual;
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

    return {
      create: create,
      updateByDocOrUserId: updateByDocOrUserId,
      updateManyByDocOrUserId: updateManyByDocOrUserId,
      updateHandicap: updateHandicap,
    }
  }]);
}
