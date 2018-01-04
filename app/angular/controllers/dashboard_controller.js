'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$scope', 'GameService', 'UserService', 'FriendService', 'StatsService', function($rs, $scope, gameService, userService, friendService, statsService) {

    const ctrl = this;
    ctrl.user = userService.data.user;
    $scope.stats = statsService.data;
    $scope.friendsData = friendService.data;

    ctrl.init = function() {
      statsService.getByDocOrUserId(ctrl.user._id);
      friendService.getAllFriends(ctrl.user.email);
    };

    ctrl.init();
  }]);
};
