'use strict';

module.exports = function(app) {
  app.factory('UserService', ['$rootScope', '$http', function($rs, $http) {

    let data = {
      user: {},
      allUsers: {},
    };

    let getByEmailOrUsername = function(emailOrUsername) {
      return new Promise((resolve, reject) => {
        let userData = {
          emailOrUsername: emailOrUsername,
        };

        $http.post('/users', userData)
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

    let getAllUsers = function(emailOrUsername) {
      return new Promise((resolve, reject) => {
        let userData = {
          emailOrUsername: emailOrUsername,
        };
        $http.post(`${$rs.baseUrl}/users/all`, userData)
          .then((users) => {
            data.allUsers.users = users.data;
            resolve(users.data);
          })
          .catch((err) => {
            console.log('Error getting all users.');
          });
      });
    };

    let updateManyUsers = function(updateData) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/users/update-many`, updateData)
          .then(resolve)
          .catch(reject);
      });
    }

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
            reject;
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
      getAllUsers: getAllUsers,
      updateUser: updateUser,
      updateManyUsers: updateManyUsers,
      calcHandicap: calcHandicap,
      calcWinRatio: calcWinRatio,
      data: data,
    }
  }]);
};
