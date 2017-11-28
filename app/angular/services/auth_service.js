'use strict';

module.exports = function(app) {
  app.service('AuthService', ['$rootScope', '$http', '$location', 'UserService', function($rs, $http, $location, UserService) {

    let signup = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signup`, userData)
        .then((user) => {
          // delete user.config.data.password;
          // UserService.user = user.data;
          // window.sessionStorage.setItem('user', user.data.username);
          $location.path('/dashboard');
        })
        .catch((err) => {
          alert('Error creating user.');
        });
    };

    let signin = function(userData) {
      $http.post(`${$rs.baseUrl}/users/signin`, userData)
        .then((user) => {
          // delete user.config.data.password;
          // UserService.user = user.data;
          // window.sessionStorage.setItem('user', user.data.username);
          $location.path('/dashboard');
        })
        .catch((err) => {
          alert('Error signing in.');
        });
    };

    let signout = function() {
      $http.get(`${$rs.baseUrl}/users/signout`)
        .then((res) => {
          // window.sessionStorage.removeItem('user');
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
