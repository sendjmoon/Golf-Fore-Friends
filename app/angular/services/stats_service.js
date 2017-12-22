'use strict';

module.exports = function(app) {
  app.factory('StatsService', ['$rootScope', '$http', function($rs, $http) {

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
    }

    const updateByDocOrUserId = function(docOrUserId, result) {
      return new Promise((resolve, reject) => {
        let updateData = {};
        let updateOptions = {};

        if (result === 'solo') updateOptions = { $inc: { solo: 1}};
        if (result === 'win') updateOptions = { $inc: { wins: 1 }};
        if (result === 'loss') updateOptions = { $inc: { losses: 1 }};
        if (result === 'tie') updateOptions = { $inc: { ties: 1 }};

        updateData.docOrUserId = docOrUserId;
        updateData.updateOptions = updateOptions;

        $http.post(`${$rs.baseUrl}/users/stats/update`, updateData)
          .then(resolve)
          .catch(reject);
      });
    }

    //TODO: async forEach? return an error if any one of them has an error
    const updateManyByDocOrUserId = function(resultsArray) {
      return new Promise((resolve, reject) => {
        resultsArray.forEach((result) => {
          updateByDocOrUserId(result.playerId, result.result);
        });
        resolve();
      });
    }

    return {
      create: create,
      updateByDocOrUserId: updateByDocOrUserId,
      updateManyByDocOrUserId: updateManyByDocOrUserId,
    }
  }]);
}
