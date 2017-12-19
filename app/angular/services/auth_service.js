'use strict';

module.exports = function(app) {
  app.service('AuthService', ['$rootScope', '$http', '$location', 'UserService', 'StatsService', function($rs, $http, $location, userService, statsService) {

    const signup = function(userData) {
      return new Promise((resolve, reject) => {
        userService.create(userData)
          .then((newUserId) => {
            statsService.create(newUserId)
              .then((newStatsId) => {
                const updateData = {
                  stats: newStatsId,
                };
                userService.update(updateData)
                  .then(() => {
                    $location.path('/dashboard');
                    $rs.$apply();
                    resolve();
                  });
              });
          })
          .catch(reject);
      });
    };

    let signin = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signin`, userData)
        .then((res) => {
          $location.path('/dashboard');
        })
        .catch((err) => {
          alert('Error signing in.');
        });
    };

    let signout = function() {
      $http.get(`${$rs.baseUrl}/users/signout`)
        .then((res) => {
          $location.path('/signin');
        })
        .catch((err) => {
          alert('Error signing out.');
        });
    };

    return {
      signup: signup,
      signin: signin,
      signout: signout,
    };
  }]);
};
