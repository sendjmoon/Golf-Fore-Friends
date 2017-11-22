'use strict';

module.exports = function(app) {
  app.service('UserService', ['$rootScope', '$http', function($rs, $http) {

    this.updateUser = function(user, newData) {
      return new Promise((resolve, reject) => {
        let userData = {
          emailOrUsername: user.emailOrUsername,
          newData: newData,
        };
        $http.post('/users/update', userData)
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            alert('error updating user');
            reject();
          });
      });
    };

    this.calcHandicap = function(user, newHandicap) {
      return new Promise((resolve, reject) => {
        let gameIdsArray = user.gameIds;
        let handicap = 0;
        let handicapData = {};
        console.log('calc handicap function');
        console.log(user);
        if (gameIdsArray.length < 1) resolve();
        if (gameIdsArray.length === 1) {
          console.log('length is 1');
          handicap = gameIdsArray[0].strokes;
          console.log(handicap);
          handicapData.handicapActual = handicap;
          handicapData.handicap = handicap,
          resolve(handicapData);
        }
        if (gameIdsArray.length > 1) {
          handicap = ((user.handicap * gameIdsArray.length - 1 + newHandicap) / gameIdsArray.length);
          handicapData.handicapActual = Math.round(handicap * 1000) / 1000;
          handicapData.handicap = Math.round(handicap);
          console.log(handicapData);
          resolve(handicapData);
        }
      });
    };

  }]);
};
