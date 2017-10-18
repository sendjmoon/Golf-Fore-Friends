'use strict';

module.exports = function(app) {
  app.service('UserService', ['$rootScope', '$http', function($rs, $http) {

    this.calcHandicap = function() {
      let gamesArray = $rs.user.gameIds;
      let total = 0;
      let handicap = 0;

      gamesArray.forEach((game) => {
        total += game.score;
      });

      handicap = total / gamesArray.length;

      this.updateHandicap(handicap)
        .catch((err) => {
          alert('error calculating handicap');
        });
    };

    this.updateHandicap = function(handicap) {
      return new Promise((resolve, reject) => {
        let handicapData = {};
        handicapData.handicap = handicap;
        $http.post('users/handicap/update', handicapData)
          .then(resolve)
          .catch((err) => {
            alert('error updating handicap');
            reject();
          });
      });
    };

  }]);
};
