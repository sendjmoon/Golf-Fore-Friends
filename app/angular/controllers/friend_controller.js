'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$http', '$location', 'AuthService', function($rs, $http, $location, AuthService) {

    this.usersArray = [];
    this.friendsArray = [];
    this.searchResults = [];

    // AuthService.checkSessionExists();

    this.getAllUsers = function() {
      $http.get($rs.baseUrl + '/users/all')
        .then((allUsers) => {
          this.usersArray = allUsers.data;
        })
        .catch((err) => {
          alert('error getting users');
        });
    };

    this.getAllFriends = function() {
      $http.get($rs.baseUrl + '/friends/list')
        .then((allFriends) => {
          this.friendsArray = allFriends.data;
          this.friendsArray.forEach((friend) => {
            this.usersArray.splice(this.usersArray.indexOf(friend), 1);
          });
          this.searchListener(this.usersArray, 'user-email-input');
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
          if (res.data.nModified === 0) {
            alert('friend already exists');
          } else {
            console.log('added friend');
          }
        })
        .catch((err) => {
          alert('error adding friend');
        });
    };

    this.searchListener = function(userArray, inputId) {
      let searchBox = document.getElementById(inputId);
      searchBox.addEventListener('keyup', () => {
        let input = searchBox.value.toUpperCase();
        let results = userArray.filter((user) => {
          $rs.$apply(() => {
            if (input.length < 1) {
              this.searchResults = [];
              return;
            }
            if (user.email.toUpperCase().indexOf(input) > -1) {
              if (this.searchResults.indexOf(user) > -1) return;
              else this.searchResults.push(user);
            }
            if (user.email.toUpperCase().indexOf(input) < 0) {
              if (this.searchResults.indexOf(user) > -1) {
                this.searchResults.splice(this.searchResults.indexOf(user), 1);
              }
            }
          });
        });
      });
    };

  }]);
};
