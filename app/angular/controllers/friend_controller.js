'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$http', '$location', function($rs, $http, $location) {
    $rs.user === undefined ? $location.path('/') : this.user = $rs.user;
    this.user._id === undefined ? $location.path('/') : true;

    this.getAllUsers = function() {
      $http.get(`/users`)
        .then((res) => {
          this.allUsers = res.data;
        })
        .catch((err) => {
          alert('error getting users');
        });
    };

    this.getFriendList = function() {
      $http.get(`/friends/list`)
        .then((friendList) => {
          this.friendList = friendList.data;
        })
        .catch((err) => {
          alert('error getting friends list');
        });
    };

    this.addFriend = function(friendId) {
      let friendData = {};
      friendData._id = friendId;
      $http.post(`/friends/add`, friendData)
        .then((res) => {
          res.data === false ? alert('friend already exists') : true;
        })
        .catch((err) => {
          alert('error adding friend');
        });
    };
  }]);
};
