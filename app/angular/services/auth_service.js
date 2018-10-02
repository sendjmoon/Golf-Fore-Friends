'use strict';

module.exports = function(app) {
  app.service('AuthService', ['$rootScope', '$http', '$location', 'UserService', 'StatsService', function($rs, $http, $location, userService, statsService) {

    const createNewUserDocs = function(userData) {
      return new Promise((resolve, reject) => {
        userService.create(userData)
          .then((newUser) => {
            statsService.create(newUser._id)
              .then((newStatsId) => {
                const newDocs = {
                  newUser: newUser,
                  newStatsId: newStatsId,
                }

                resolve(newDocs);
              });
          })
          .catch(reject);
      });
    }

    const signup = function(userData) {
      return new Promise((resolve, reject) => {
        createNewUserDocs(userData)
          .then((newDocs) => {
            const updateOptions = {
              stats: newDocs.newStatsId,
            }
            userService.updateByEmailOrUsername(newDocs.newUser.email, updateOptions)
              .then(() => {
                $location.path('/dashboard');
                $rs.$apply();
                resolve();
              });
          })
          .catch(reject);
      });
    };

    const signin = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signin`, userData)
        .then((res) => {
          $location.path('/dashboard');
        })
        .catch((err) => {
          alert('Error signing in.');
        });
    };

    const signout = function() {
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
