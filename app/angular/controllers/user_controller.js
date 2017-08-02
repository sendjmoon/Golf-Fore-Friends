'use strict';

module.exports = function(app) {
  app.controller('UserController', ['$rootScope', '$http', function($rs, $http) {
    this.baseUrl = $rs.baseUrl;

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
          res.data === false ? alert('that friend\'s already on your list') : true;
        })
        .catch((err) => {
          alert('error adding friend');
        });
    };

    this.getFriends = function() {
      $http.get(`${this.baseUrl}/users/friends/all`)
        .then((friends) => {
          console.log(friends);
        })
        .catch((err) => {
          alert('error getting friends list');
        });
    };

  }]);
};
