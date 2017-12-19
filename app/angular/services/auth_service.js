'use strict';

module.exports = function(app) {
  app.service('AuthService', ['$rootScope', '$http', '$location', 'UserService', 'StatsService', function($rs, $http, $location, userService, statsService) {

    let signup = function(userData) {
      userService.create(userData)
        .then((newUserId) => {
          statsService.create(newUserId)
            .then((newStatsId) => {
              $location.path('/dashboard');
              $rs.$apply();
            })
            .catch(() => {
              console.log('error signing up');
            });
        })
        .catch(() => {
          console.log('error signing up');
        });
    };

    let signin = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signin`, userData)
        .then((res) => {
          console.log(res.data.message);
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
