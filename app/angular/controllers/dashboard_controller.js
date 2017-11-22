'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'AuthService', 'GameService', 'UserService', function($rs, $location, $http, AuthService, GameService, UserService) {

    AuthService.checkSessionExists();
    this.user = $rs.user;
    this.gamesPlayed = this.user.gameIds.length;
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
