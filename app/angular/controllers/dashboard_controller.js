'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'GameService', 'UserService', function($rs, $location, $http, GameService, UserService) {

    this.userStats = UserService.user.stats;
    this.leaderboardArray = [];

    this.rankFriends = function() {
      GameService.rankFriends()
        .then((sortedFriends) => {
          $rs.$apply(() => {
            this.leaderboardArray = sortedFriends;
          });
        })
        .catch((err) => {
          console.log('error ranking players');
        });
    };
  }]);
};
