'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$scope', 'UserService', 'FriendService', 'SearchService', function($rs, $scope, UserService, FriendService, SearchService) {

    let ctrl = this;
    ctrl.user = UserService.data.user;
    ctrl.allFriends = FriendService.allFriends;
    ctrl.allUsers = UserService.data.allUsers;
    ctrl.searchResults = SearchService.searchResults;
    ctrl.$input = $('#search-input-users');

    ctrl.addFriend = function(friendId) {
      FriendService.addFriend(friendId)
        .then(FriendService.getAllFriends(ctrl.user.email));
    };

    let init = function() {
      FriendService.getAllFriends(ctrl.user.email)
        .then(UserService.getAllUsers(ctrl.user.email))
          .then(SearchService.searchListener('email', ctrl.allUsers, ctrl.$input));
    };

    init();

  }]);
}
