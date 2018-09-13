'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$scope', 'GameService', 'UserService', 'FriendService', 'StatsService', function($rs, $scope, gameService, userService, friendService, statsService) {

    const ctrl = this;
    ctrl.user = userService.data.user;
    $scope.stats = statsService.data;
    $scope.friendsData = friendService.data;
    $scope.statsData = statsService.data;
    $scope.gamesData = gameService.data.allGames;
    $scope.leaderboard = [];

    ctrl.formatDate = userService.formatDate;

    ctrl.sortLeaderboard = function() {
      $scope.leaderboard = $scope.friendsData.friends;
      $scope.leaderboard.push(ctrl.user);
      $scope.leaderboard.sort((a, b) => {
        return a.stats.handicapActual > b.stats.handicapActual;
      });
      $scope.$digest();
    }

    ctrl.formatRecentGamesDate = function(dateStr) {
      let dateArray = dateStr.toUpperCase().split(' ');
      let dateObj = {
        day: dateArray[0],
        month: dateArray[1],
        date: dateArray[2],
        year: dateArray[3],
      }

      return dateObj;
    }

    ctrl.init = function() {
      gameService.getAllById(ctrl.user.gameIds);
      friendService.getAllFriends(ctrl.user.email)
        .then(ctrl.sortLeaderboard);
    }

    ctrl.init();
  }]);
};
