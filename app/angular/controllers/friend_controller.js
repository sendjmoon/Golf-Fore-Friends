'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$scope', 'UserService', 'FriendService', 'SearchService', function($rs, $scope, UserService, FriendService, SearchService) {

    let ctrl = this;
    ctrl.user = UserService.data.user;
    $scope.FriendService = FriendService;
    $scope.UserService = UserService;
    $scope.friendsData = FriendService.data;
    $scope.usersData = UserService.data.allUsers;
    $scope.searchResults = SearchService.searchResults;

    ctrl.addFriend = function(userId, statsId) {
      FriendService.addFriend(userId, statsId)
        .then(ctrl.init());
    };

    ctrl.init = function() {
      let searchOptions = {
        searchBy: 'email',
        inputId: 'search-input-users',
        searchArray: $scope.usersData.users,
        compareArray: $scope.friendsData.friends,
        compareFn: SearchService.compareIfFriends,
      };
      FriendService.getAllFriends(ctrl.user.email)
        .then(UserService.getAllUsers(ctrl.user.email))
        .then(SearchService.searchListener(searchOptions));
    };

    ctrl.init();
  }]);
}
