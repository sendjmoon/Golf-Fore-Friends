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
        $http.get('/friends/list')
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

    this.sortByLowest = function(array) {
      return new Promise((resolve, reject) => {
        let dummyUser = {
          fullName: 'N/A',
          handicap: 'N/A',
        };

        if (array.length < 3) {
          if (array.length < 1) reject();
          let emptyPlaces = 3 - array.length;
          for (let i = 0; i < emptyPlaces; i++) {
            array.push(dummyUser);
          }
        }

        let done = false;
        while(!done) {
          done = true;
          for (let i = 1; i < array.length; i++) {
            if (array[i - 1].handicap > array[i].handicap) {
              let temp = array[i - 1];
              array[i - 1] = array[i];
              array[i] = temp;
              done = false;
            }
          }
        }

        resolve(array);
      });
    };
  }]);
};
