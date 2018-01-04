'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$scope', 'UserService', 'FriendService', 'SearchService', function($rs, $scope, UserService, FriendService, SearchService) {

    let ctrl = this;

    $scope.FriendService = FriendService;
    $scope.UserService = UserService;
    $scope.friendsData = FriendService.data;
    $scope.usersData = UserService.data.allUsers;
    $scope.searchResults = SearchService.searchResults;
    ctrl.user = UserService.data.user;

    ctrl.addFriend = function(userId, statsId) {
      FriendService.addFriend(userId, statsId)
        .then(ctrl.init());
    };

    ctrl.init = function() {
      FriendService.getAllFriends(ctrl.user.email)
        .then(() => {
          UserService.getAllUsers(ctrl.user.email)
            .then(() => {
              let searchOptions = {
                searchBy: 'email',
                inputId: 'search-input-users',
                searchArray: $scope.usersData.users,
                compareArray: $scope.friendsData.friends,
                compareFn: SearchService.compareIfFriends,
              };
              SearchService.searchListener(searchOptions);
            });
          });
    };

    ctrl.init();
  }]);
}
