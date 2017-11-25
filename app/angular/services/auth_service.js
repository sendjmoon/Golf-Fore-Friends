'use strict';

module.exports = function(app) {
  app.service('AuthService', ['$rootScope', '$http', '$location', 'UserService', function($rs, $http, $location, UserService) {

    this.signup = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signup`, userData)
        .then((user) => {
          delete user.config.data.password;
          UserService.user = user.data;
          window.sessionStorage.setItem('user', user.data.username);
          $location.path('/dashboard');
        })
        .catch((err) => {
          alert('Error creating user.');
        });
    };

    this.signin = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signin`, userData)
        .then((user) => {
          delete user.config.data.password;
          UserService.user = user.data;
          window.sessionStorage.setItem('user', user.data.username);
          $location.path('/dashboard');
        })
        .catch((err) => {
          alert('Error signing in.');
        });
    };

    this.signout = function() {
      $http.get(`${$rs.baseUrl}/users/signout`)
        .then((res) => {
          window.sessionStorage.removeItem('user');
          $location.path('/signin');
        })
        .catch((err) => {
          alert('Error signing out.');
        });
    };

    this.checkSessionExists = function() {
        let username = window.sessionStorage.getItem('user');
        return new Promise((resolve, reject) => {
        if (username === null) {
          // $location.path('/');
          reject($location.path('/'));
        }

        UserService.getByEmailOrUsername(username)
          .then((user) => {
            console.log('wtf');
            UserService.user = user.data;
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

  }]);
};
