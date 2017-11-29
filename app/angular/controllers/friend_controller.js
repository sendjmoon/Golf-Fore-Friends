'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$scope', 'UserService', 'FriendService', 'SearchService', function($rs, $scope, UserService, FriendService, SearchService) {

    let ctrl = this;
    ctrl.user = UserService.data.user;
    ctrl.searchResults = SearchService.searchResults;
    ctrl.$input = $('#search-input-users');

    $scope.FriendService = FriendService;
    $scope.UserService = UserService;
    $scope.friendsData = FriendService.data.allFriends;
    $scope.usersData = UserService.data.allUsers;

    $scope.$watch('UserService.data.allUsers', function(newVal, oldVal) {
      console.log('change');
    })

    ctrl.addFriend = function(friendId) {
      FriendService.addFriend(friendId)
        .then(FriendService.getAllFriends(ctrl.user.email));
    };

    ctrl.init = function() {
      FriendService.getAllFriends(ctrl.user.email)
        .then(() => {
          UserService.getAllUsers(ctrl.user.email)
            .then((users) => {
              SearchService.searchListener('email', users, ctrl.$input);
            });
          });
    };

    ctrl.init();

  }]);
}
