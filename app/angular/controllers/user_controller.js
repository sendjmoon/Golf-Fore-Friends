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

    this.addFriend = function(friendId) {
      let friend = {};
      friend._id = friendId;
      $http.post(`${this.baseUrl}/users/friends/add`, friend)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert('error adding friend');
        });
    };
  }]);
};
