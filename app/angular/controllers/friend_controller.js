'use strict';

module.exports = function(app) {
  app.controller('FriendController', ['$scope', '$route', 'UserService', 'FriendService', 'SearchService', function($scope, $route, userService, friendService, searchService) {

    let ctrl = this;
    ctrl.user = userService.data.user;
    $scope.friendsData = friendService.data;
    $scope.usersData = userService.data.allUsers;
    $scope.searchResults = searchService.searchResults;

    ctrl.addFriend = function(userId, statsId) {
      friendService.addFriend(ctrl.user._id, ctrl.user.statsId, userId, statsId)
        .then($route.reload());
    };

    ctrl.init = function() {
      friendService.getAllFriends(ctrl.user.email)
        .then(userService.getAllOtherUsers(ctrl.user.email))
        .then(() => {
          let searchOptions = {
            searchBy: 'email',
            inputId: 'search-input-users',
            searchArray: $scope.usersData.users,
            compareArray: $scope.friendsData.friends,
            compareFn: searchService.compareIfFriends,
          }

          searchService.searchListener(searchOptions);
        });
    };

    ctrl.init();
  }]);
}
