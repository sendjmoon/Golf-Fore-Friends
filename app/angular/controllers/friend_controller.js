'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$http', '$location', 'AuthService', function($rs, $http, $location, AuthService) {

    AuthService.checkSessionExists();

    this.getAllUsers = function() {
      $http.get($rs.baseUrl + '/users/all')
        .then((res) => {
          this.allUsers = res.data;
        })
        .catch((err) => {
          alert('error getting users');
        });
    };

    this.getFriendList = function() {
      $http.get($rs.baseUrl + '/friends/list')
        .then((friendList) => {
          this.friendList = friendList.data;
        })
        .catch((err) => {
          alert('error getting friends list');
        });
    };

    this.addFriend = function(friendId) {
      let friendData = {
        _id: friendId,
      };
      $http.post($rs.baseUrl + '/friends/add', friendData)
        .then((res) => {
          res.data.nModified === 0 ? alert('friend already exists') : true;
        })
        .catch((err) => {
          alert('error adding friend');
        });
    };

  }]);
};
