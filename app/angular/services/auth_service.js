'use strict';

module.exports = function(app) {
  app.service('AuthService', ['$rootScope', '$http', '$location', function($rs, $http, $location) {

    this.signup = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signup`, userData)
        .then((res) => {
          delete res.config.data.password;
          $location.path('/home');
        })
        .catch((err) => {
          alert('Error creating user.');
        });
    };

    this.signin = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signin`, userData)
        .then((res) => {
          delete res.config.data.password;
          $location.path('/home');
        })
        .catch((err) => {
          alert('Error signing in.');
        });
    };

    this.signout = function() {
      $http.get(`${$rs.baseUrl}/users/signout`)
        .then((res) => {
          $location.path('/signin');
        })
        .catch((err) => {
          alert('Error signing out.');
        });
    };
  }]);
};