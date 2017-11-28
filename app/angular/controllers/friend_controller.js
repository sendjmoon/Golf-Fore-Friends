'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', 'UserService', 'FriendService', 'SearchService', function($rs, UserService, FriendService, SearchService) {
    let ctrl = this;

    ctrl.allFriends = FriendService.data.allFriends;
    ctrl.allUsers = UserService.data.allUsers;
    ctrl.user = UserService.data.user;
    ctrl.searchResults = [];

    ctrl.addFriend = function(friendId) {
      FriendService.addFriend(friendId);
      init();
    };

    let init = function() {
      FriendService.getAllFriends(ctrl.user.email)
        .then(() => {
          UserService.getAllUsers(ctrl.user.email)
            .then((users) => {
              ctrl.searchListener('email', users, 'search-input-users')
                .then((res) => {
                  console.log(res);
                });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    init();

    ctrl.searchListener = function(prop, searchArray, inputId) {
      return new Promise((resolve, reject) => {
        let results = [];
        let searchBox = document.getElementById(inputId);
        searchBox.addEventListener('keyup', () => {
          let input = searchBox.value.toUpperCase();
          results = searchArray.filter((user) => {
            user[prop] = user[prop].toUpperCase();
            $rs.$apply(() => {
              if (input.length < 1) {
                ctrl.searchResults = [];
                return;
              }
              if (user[prop].indexOf(input) > -1 && ctrl.searchResults.indexOf(user) > -1) {
                return;
              }
              else if (user[prop].indexOf(input) < 0 && ctrl.searchResults.indexOf(user) > -1) {
                ctrl.searchResults.splice(ctrl.searchResults.indexOf(user), 1);
              }
              else ctrl.searchResults.push(user);
            });
          });
          resolve(results);
        });
      });
    };

  }]);
};
