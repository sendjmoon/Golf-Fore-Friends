'use strict';

module.exports = function(app) {
  app.factory('UserService', ['$rootScope', '$http', function($rs, $http) {

    let user;

    let getByEmailOrUsername = function(emailOrUsername) {
      return new Promise((resolve, reject) => {
        let userData = {};
        userData.emailOrUsername = emailOrUsername;
        $http.post('/users', userData)
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

    let updateUser = function(user, newData) {
      return new Promise((resolve, reject) => {
        let userData = {
          emailOrUsername: user.emailOrUsername,
          newData: newData,
        };
        $http.post('/users/update', userData)
          .then((user) => {
            resolve(user.data);
          })
          .catch((err) => {
            alert('error updating user');
            reject();
          });
      });
    };

    let calcHandicap = function(totalGames, currentHandicap, strokes) {
      return new Promise((resolve, reject) => {
        let handicapData = {};

        if (totalGames < 1) return resolve();
        if (totalGames === 1) {
          handicapData.handicapActual = strokes;
          handicapData.handicap = strokes,
          resolve(handicapData);
          return;
        }

        let newHandicap = ((currentHandicap * (totalGames - 1) + strokes) / totalGames);
        handicapData.handicapActual = Math.round(newHandicap * 1000) / 1000;
        handicapData.handicap = Math.round(newHandicap);
        resolve(handicapData);
      });
    };

    let calcWinRatio = function(user) {
      console.log(user);
    };

    return {
      getByEmailOrUsername: getByEmailOrUsername,
      updateUser: updateUser,
      calcHandicap: calcHandicap,
      calcWinRatio: calcWinRatio,
      user: user,
    }

  }]);
};
