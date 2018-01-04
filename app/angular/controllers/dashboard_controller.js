'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$scope', 'GameService', 'UserService', 'FriendService', 'StatsService', function($rs, $scope, gameService, userService, friendService, statsService) {

    const ctrl = this;
    $scope.stats = statsService.data;
    $scope.friendsData = friendService.data;
    ctrl.user = userService.data.user;
    $scope.leaderboard = [];

    ctrl.init = function() {
      statsService.getByDocOrUserId(ctrl.user._id);
      friendService.getAllFriends(ctrl.user.email)
        .then(() => {
          $scope.leaderboard = $scope.friendsData.friends.sort((a, b) => {
            return a.stats.handicapActual > b.stats.handicapActual;
          });
          $scope.$digest();
        });
    };

    ctrl.init();
  }]);
};
