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
            let friendsArray = allFriends;
            let rankedArray = [];
            rankedArray.push($rs.user);
            friendsArray.length < 1 ? resolve(rankedArray) : true;
            for (let i = 0; i < friendsArray.length; i++) {
              if (friendsArray[i].handicap < rankedArray[i].handicap) {
                rankedArray.unshift(friendsArray[i]);
              } else {
                rankedArray.push(friendsArray[i]);
              }
            }
            resolve(rankedArray);
          })
          .catch(reject);
      });
    };
  }]);
};
