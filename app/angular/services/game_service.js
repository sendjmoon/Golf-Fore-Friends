'use strict';

module.exports = function(app) {
  app.service('GameService', ['$rootScope', '$http', function($rs, $http) {

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

    this.getAllFromLocalStorage = function() {
      return new Promise((resolve, reject) => {
        let gameData = JSON.parse(window.localStorage.getItem('games'));
        if (gameData.length < 1) reject();
        resolve(gameData);
      });
    };

    this.getAllFriends = function() {
      return new Promise((resolve, reject) => {
        //TODO: change list to all
        $http.get($rs.baseUrl + '/friends/list')
          .then((allFriends) => {
            resolve(allFriends.data);
          })
          .catch((err) => {
            alert('error getting friends list');
            reject();
          });
      });
    };

    this.rankFriends = function() {
      return new Promise((resolve, reject) => {
        this.getAllFriends()
          .then((allFriends) => {
            allFriends.push($rs.user);
            this.sortByLowest(allFriends)
              .then((sortedArray) => {
                resolve(sortedArray);
              })
              .catch(reject);
          })
          .catch(reject);
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
          if (array.length < 1) reject();
          let emptyPlaces = 3 - array.length;
          for (let i = 0; i < emptyPlaces; i++) {
            array.push(dummyUser);
          }
        }

        resolve(array);
      });
    };
  }]);
};
