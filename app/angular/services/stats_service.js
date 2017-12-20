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

    const update = function(docOrUserId, result) {
      return new Promise((resolve, reject) => {
        let updateData = {};
        let updateOptions = {};

        if (result === 'solo') return resolve();
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

    return {
      create: create,
      update: update,
    }
  }]);
}
