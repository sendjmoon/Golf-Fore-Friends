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
              ctrl.searchListener('email', users, $('#search-input-users'));
            });
        });
    };

    init();

    ctrl.searchListener = function(prop, searchArray, $input) {
      let inputStr;
      let objIndex;
      let resultFound = false;
      let resultExists = false;

      $input.on('keyup', () => {
        searchArray.filter((obj) => {
          $rs.$apply(() => {
            inputStr = $input.val().toUpperCase();
            objIndex = ctrl.searchResults.indexOf(obj);
            obj[prop] = obj[prop].toUpperCase();
            obj[prop].indexOf(inputStr) < 0 ? resultFound = false : resultFound = true;
            objIndex < 0 ? resultExists = false : resultExists = true;
            if (inputStr.length < 1) return ctrl.searchResults = [];
            if (resultFound === false && resultExists) {
              ctrl.searchResults.splice(objIndex, 1);
            }
            if (resultFound) {
              if (resultExists) return;
              else ctrl.searchResults.push(obj);
            }
          });
        });
      });
    };

  }]);
};
