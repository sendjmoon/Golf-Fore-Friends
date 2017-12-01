'use strict';

module.exports = function(app) {
  app.factory('GameService', ['$rootScope', '$http', 'FriendService', function($rs, $http, FriendService) {

    let createGame = function(gameData) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/games/create`, gameData)
          .then((res) => {
            console.log(res);
          })
          .catch(reject);
      });
    };

    this.getByPublicId = function(gameId) {
      return new Promise((resolve, reject) => {
        $http.get($rs.baseUrl + '/games/' + gameId)
          .then((game) => {
            resolve(game.data);
          })
          .catch(reject);
      });
    };

    this.getAllByPublicId = function(publicIdArray) {
      return new Promise((resolve, reject) => {
        let publicIdData = {
          publicIdArray: publicIdArray,
        };
        $http.post($rs.baseUrl + '/games/all', publicIdData)
          .then((games) => {
            resolve(games.data);
          })
          .catch(() => {
            alert('error getting games');
            reject();
          });
      });
    };

    this.findWinner = function(array) {
      return new Promise((resolve, reject) => {
        if (array.length === 1) {
          resolve(array);
          return;
        }

        array.sort(function(a, b) {
          return a.strokes - b.strokes;
        });

        let foundTie = false;

        for (let i = 1; i < array.length; i++) {
          if (array[0].strokes === array[i].strokes) {
            array[0].tie = true;
            array[i].tie = true;
            foundTie = true;
          } else if (foundTie) {
            array[i].loss = true;
          } else {
            array[0].win = true;
            array[i].loss = true;
          }
        }

        resolve(array);
      });
    };

    this.sortByLowest = function(array) {
      return new Promise((resolve, reject) => {
        let dummyUser = {
          fullName: 'N/A',
          handicap: 'N/A',
        };

        array.sort((a, b) => {
          return a.stats.handicap - b.stats.handicap;
        });

        if (array.length < 3) {
          if (array.length < 1) reject;
          let emptyPlaces = 3 - array.length;
          for (let i = 0; i < emptyPlaces; i++) {
            array.push(dummyUser);
          }
        }

        resolve(array);
      });
    };

    return {
      createGame: createGame,
    }
  }]);
};
