'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', 'AuthService', function($rs, $location, AuthService) {

    this.calcHandicap = function() {
      let gamesArray = $rs.user.gameIds;
      let total = 0;

      gamesArray.forEach((game) => {
        total += game.score;
      });

      total = total / gamesArray.length;
    };

    this.calcHandicap();
    AuthService.checkSessionExists();
  }]);
};
