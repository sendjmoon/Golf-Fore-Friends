'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$scope', 'GameService', 'UserService', 'FriendService', 'StatsService', function($rs, $scope, gameService, userService, friendService, statsService) {

    const ctrl = this;
    ctrl.user = userService.data.user;
    $scope.data = statsService.data;

    ctrl.init = function() {
      statsService.getByDocOrUserId(ctrl.user._id)
        .catch((err) => {
          console.log('Error retrieving user\'s stats.');
        });
    };

    ctrl.init();
  }]);
};
