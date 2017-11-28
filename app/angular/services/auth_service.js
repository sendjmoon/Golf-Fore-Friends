'use strict';

module.exports = function(app) {
  app.service('AuthService', ['$rootScope', '$http', '$location', 'UserService', function($rs, $http, $location, UserService) {

    let signup = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signup`, userData)
        .then((res) => {
          console.log(res.message);
          $location.path('/dashboard');
        })
        .catch((err) => {
          alert('Error creating user.');
        });
    };

    let signin = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signin`, userData)
        .then((res) => {
          console.log(res.message);
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
