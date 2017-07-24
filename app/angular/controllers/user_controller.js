'use strict';

module.exports = function(app) {
  app.controller('UserController', ['$http', function($http) {
    console.log('user controller');

    this.getUsers = function() {
      $http.get(`${this.baseUrl}/users`)
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          alert('error getting users');
        });
    };
  }]);
};
