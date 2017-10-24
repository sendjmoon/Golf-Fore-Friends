'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$http', '$location', 'AuthService', function($rs, $http, $location, AuthService) {

    this.usersArray = [];
    this.friendsArray = [];
    // this.usersMap = new Map();
    // this.friendsMap = new Map();

    AuthService.checkSessionExists();

    this.getAllUsers = function() {
      $http.get($rs.baseUrl + '/users/all')
        .then((allUsers) => {
          this.usersArray = allUsers.data;
          // this.usersArray.forEach((user) => {
          //   this.usersMap.set(user.email, user);
          // });
        })
        .catch((err) => {
          alert('error getting users');
        });
    };

    this.getAllFriends = function() {
      $http.get($rs.baseUrl + '/friends/list')
        .then((allFriends) => {
          this.friendsArray = allFriends.data;
          // this.friendsArray.forEach((friend) => {
          //   this.usersMap.delete(friend.email);
          // });
          this.friendsArray.forEach((friend) => {
            this.usersArray.splice(this.usersArray.indexOf(friend), 1);
          });
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
