'use strict';

module.exports = function(app) {
  app.service('UserService', ['$rootScope', function($rs) {

    this.calcHandicap = function() {
      let gamesArray = $rs.user.gameIds;
      let total, handicap = 0;

      gamesArray.forEach((game) => {
        total += game.score;
      });

      handicap = total / gamesArray.length;

      this.updateHandicap(handicap);
    };

    this.updateHandicap = function(handicap) {
      let handicapData = {};
      handicapData.handicap = handicap;
      $http.post('users/handicap/update', handicapData)
        .then((res) => {
          console.log('updated handicap');
          console.log(res);
        })
        .catch((err) => {
          alert('error updating handicap');
        });
    };
  }]);
};
