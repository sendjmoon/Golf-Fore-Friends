'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'AuthService', function($rs, $location, $http, AuthService) {

    this.user = $rs.user;

    this.calcHandicap = function() {
      let gamesArray = $rs.user.gameIds;
      let total = 0;
      gamesArray.forEach((game) => {
        total += game.score;
      });
      total = total / gamesArray.length;
      this.updateHandicap(total)
        .catch((err) => {
          alert('error updating handicap');
        });
    };

    this.updateHandicap = function(newHandicap) {
      let handicap = {};
      handicap.new = newHandicap;
      return new Promise((resolve, reject) => {
        $http.post('/users/update/handicap', handicap)
          .then(resolve)
          .catch((err) => {
            alert('error posting updated handicap');
            reject();
          });
      })
    };

    AuthService.checkSessionExists();
    this.calcHandicap();
  }]);
};
