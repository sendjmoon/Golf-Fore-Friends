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

    return {
      create: create,
    }
  }]);
}
