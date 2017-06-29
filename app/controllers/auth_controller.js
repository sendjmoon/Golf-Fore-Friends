'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$http', '$location', function($http, $location) {
    console.log('auth controller');

    this.signup = function(userData) {
      $http.post(`${this.baseUrl}/users/signup`, userData)
        .then((res) => {
          console.log(res);
          $location.path('/home');
        })
        .catch((err) => {
          alert('error creating user.');
        });
    };
  }]);
};
