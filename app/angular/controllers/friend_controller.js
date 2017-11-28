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
      let objIndex;
      let matchFound = false;
      let matchExists = false;

      $input.on('keyup', () => {
        searchArray.filter((obj) => {
          $rs.$apply(() => {
            let inputStr = $input.val().toUpperCase();
            objIndex = ctrl.searchResults.indexOf(obj);
            obj[prop] = obj[prop].toUpperCase();

            obj[prop].indexOf(inputStr) > -1 ? matchFound = true : matchFound = false;
            objIndex  > -1 ?matchExists = true : matchExists = false;

            if (inputStr.length < 1) return ctrl.searchResults = [];
            if (matchFound === false && matchExists) ctrl.searchResults.splice(objIndex, 1);
            if (matchFound) {
              if (matchExists) return;
              ctrl.searchResults.push(obj);
            }
          });
        });
      });
    };

  }]);
};
