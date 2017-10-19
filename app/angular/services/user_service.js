'use strict';

module.exports = function(app) {
  app.service('UserService', ['$rootScope', '$http', function($rs, $http) {

    this.calcHandicap = function(user) {
      return new Promise((resolve, reject) => {
        let gameIds = user.gameIds;
        let handicap = 0;

        if (gameIds === undefined) return reject();

        gameIds.forEach((game) => {
          handicap += game.score;
        });

        handicap = handicap / gameIds.length;
        resolve(handicap);
      });
    };

    this.updateHandicap = function(user) {
      return new Promise((resolve, reject) => {
        this.calcHandicap(user)
          .then((handicap) => {
            let handicapData = {};
            handicapData.user = user;
            handicapData.handicap = handicap;
            $http.post('users/handicap/update', handicapData)
              .then((newHandicap) => {
                resolve(newHandicap);
              })
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
