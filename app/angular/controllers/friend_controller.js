'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$scope', '$http', 'UserService', 'FriendService', function($rs, $scope, $http, UserService, FriendService) {

    this.allFriends = FriendService.allFriends.data;
    this.allUsers = UserService.allUsers.data;

    UserService.getAllUsers(UserService.user.email);
    FriendService.getAllFriends(UserService.user.email);

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
