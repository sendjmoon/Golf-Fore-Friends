'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$http', '$location', function($http, $location) {

    this.signup = function(userData) {
      $http.post(`${this.baseUrl}/users/signup`, userData)
        .then((res) => {
          delete res.config.data.password;
          $location.path('/home');
        })
        .catch((err) => {
          alert('Error creating user.');
        });
    };

    this.signin = function(userData) {
      $http.post(`${this.baseUrl}/users/signin`, userData)
        .then((res) => {
          delete res.config.data.password;
          $location.path('/home');
        })
        .catch((err) => {
          alert('Error signing in.');
        });
    };

    this.signout = function() {
      $http.get(`${this.baseUrl}/users/signout`)
        .then((res) => {
          console.log(res);
          $location.path('/signin');
        })
        .catch((err) => {
          alert('Error signing out.');
        });
    };
  }]);
};
