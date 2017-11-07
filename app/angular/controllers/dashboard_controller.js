'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'AuthService', 'GameService', 'UserService', function($rs, $location, $http, AuthService, GameService, UserService) {

    AuthService.checkSessionExists();
    this.user = $rs.user;
    this.leaderboardArray = [];

    this.rankFriends = function() {
      GameService.rankFriends()
        .then((rankData) => {
          $rs.$apply(() => {
            this.leaderboardArray = rankData;
          });
        })
        .catch((err) => {
          console.log('error ranking players');
        });
    };
  }]);
};
