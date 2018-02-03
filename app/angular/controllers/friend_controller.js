'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$rootScope', '$scope', 'UserService', 'FriendService', 'SearchService', function($rs, $scope, userService, friendService, searchService) {

    let ctrl = this;
    ctrl.user = userService.data.user;
    $scope.friendsData = friendService.data;
    $scope.usersData = userService.data.allUsers;
    $scope.userService = userService;
    $scope.searchResults = searchService.searchResults;
    console.log($scope.userService);

    ctrl.addFriend = function(userId, statsId) {
      friendService.addFriend(userId, statsId)
        .then(ctrl.init());
    };

    ctrl.init = function() {
      let searchOptions = {
        searchBy: 'email',
        inputId: 'search-input-users',
        searchArray: $scope.userService.data.allUsers,
        compareArray: $scope.friendsData.friends,
        compareFn: searchService.compareIfFriends,
      };
      friendService.getAllFriends(ctrl.user.email)
        .then(userService.getAllUsers(ctrl.user.email))
        .then(searchService.searchListener(searchOptions));
    };

    ctrl.init();
  }]);
}
