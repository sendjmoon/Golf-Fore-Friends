'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', 'UserService', 'FriendService', function($rs, UserService, FriendService) {

    this.allFriends = FriendService.data.allFriends;
    this.allUsers = UserService.data.allUsers;
    let user = UserService.data.user;

    this.addFriend = function(friendId) {
      FriendService.addFriend(friendId);
      init();
    };

    let init = function() {
      FriendService.getAllFriends(user.email);
      UserService.getAllUsers(user.email);
    }

    init();

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
