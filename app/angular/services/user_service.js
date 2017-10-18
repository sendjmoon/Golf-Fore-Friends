'use strict';

module.exports = function(app) {
  app.service('UserService', ['$rootScope', '$http', function($rs, $http) {

    this.calcHandicap = function(gamesArray) {
      return new Promise((resolve, reject) => {
        let handicap = 0;
        gamesArray.forEach((game) => {
          handicap += game.score;
        });
        handicap = handicap / gamesArray.length;
        resolve(handicap);
        reject(() => {
          alert('error calculating handicap');
        });
      });
    };

    this.updateHandicap = function(user) {
      return new Promise((resolve, reject) => {
        this.calcHandicap(user.gameIds)
          .then((handicap) => {
            let handicapData = {};
            handicapData.handicap = handicap;
            $http.post('users/handicap/update', handicapData)
              .then(resolve)
              .catch((err) => {
                alert('error posting handicap data');
                reject();
              });
          })
          .catch(() => {
            alert('error updating handicap');
            reject();
          });
      });
    };

  }]);
};
