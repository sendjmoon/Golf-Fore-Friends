'use strict';

module.exports = function(app) {
  app.service('GameService', ['$rootScope', '$http', function($rs, $http) {

    this.getById = function(gameId) {
      $http.get($rs.baseUrl + '/games/' + gameId)
        .then((game) => {
          $rs.gameData = game.data;
        })
        .catch((err) => {
          alert('error getting game by id');
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

    this.getAllFriends = function() {
      return new Promise((resolve, reject) => {
        //TODO: change list to all
        $http.get('/friends/list')
          .then((allFriends) => {
            this.friendsArray = allFriends.data;
            resolve(this.friendsArray);
          })
          .catch((err) => {
            alert('error getting friends list');
            reject();
          });
      });
    };

    this.rankPlayers = function(playersArray) {
      return new Promise((resolve, reject) => {
        let rankedArray = [];
        rankedArray.push($rs.user);
        for (let i = 0; i < playersArray.length; i++) {
          if (playersArray[i].handicap < rankedArray[i].handicap) {
            rankedArray.unshift(playersArray[i]);
          } else {
            rankedArray.push(playersArray[i]);
          }
        }
        resolve(rankedArray);
      });
    };
  }]);
};
