'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$http', function($rs, $http) {
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

    this.getFriendList = function() {
      $http.get(`${this.baseUrl}/friends/list`)
        .then((friendList) => {
          console.log(friendList);
          this.friendList = friendList;
        })
        .catch((err) => {
          alert('error getting friends list');
        });
    };

    this.addFriend = function() {
      $http.post(`${this.baseUrl}/friends`)
        .then((res) => {
          res.data === false ? alert('friend already exists') : console.log('added friend');
        })
        .catch((err) => {
          alert('error adding friend');
        });
    };
  }]);
};
