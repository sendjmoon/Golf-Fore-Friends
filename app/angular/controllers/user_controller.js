'use strict';

module.exports = function(app) {
  app.controller('UserController', ['$http', function($http) {
    console.log('user controller');

    this.getAllUsers = function() {
      $http.get(`${this.baseUrl}/users`)
        .then((res) => {
          this.allUsers = res.data;
        })
        .catch((err) => {
          alert('error getting users');
        });
    };

    this.addFriend = function(friendId) {
      let friendData = {};
      friendData._id = friendId;
      $http.post(`${this.baseUrl}/users/friends/add`, friendData)
        .then((res) => {
          console.log('added friend');
        })
        .catch((err) => {
          console.log(err);
          alert('error adding friend');
        });
    };
  }]);
};
