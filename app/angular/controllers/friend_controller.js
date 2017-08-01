'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$http', function($http) {

    this.getAllUsers = function() {
      $http.get(`${this.baseUrl}/users`)
        .then((res) => {
          this.allUsers = res.data;
        })
        .catch((err) => {
          alert({
            error: 'error getting users',
          });
        });
    };

    this.getAllFriends = function() {
      $http.get(`${this.baseUrl}/friends/all`)
        .then((friendsList) => {
          this.friendsList = friendsList;
        })
        .catch((err) => {
          alert({
            error: 'error getting friends list',
          });
        });
    };

    this.addFriend = function() {
      $http.post(`${this.baseUrl}/friends/all`)
        .then((res) => {
          res.data === false ? alert('friend already exists') : console.log('added friend');
        })
        .catch((err) => {
          alert({
            error: 'error adding friend',
          });
        });
    };
  }]);
};
