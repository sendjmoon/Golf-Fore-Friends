'use strict';

module.exports = function(app) {
  app.factory('GameService', ['$rootScope', '$http', 'FriendService', 'UserService', function($rs, $http, FriendService, UserService) {

    let updateData = {};

    const createGame = function(gameData) {
      return new Promise((resolve, reject) => {
        calcResults(gameData.players)
          .then((newPlayersArray) => {
            let createGameData = {
              name: gameData.name,
              location: gameData.location,
              datePlayed: gameData.datePlayed,
              players: newPlayersArray,
            };
            $http.post(`${$rs.baseUrl}/games/create`, createGameData)
              .then((newGame) => {
                let updateUsersData = {
                  usersArray: createGameData.players,
                  updateQuery: {
                    $addToSet: { gameIds: newGame.data._id },
                  },
                };
                UserService.updateManyUsers(updateUsersData)
                  .then(resolve);
              })
              .catch(() => {
                console.log('Error creating game.');
                reject;
              });
          });
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
            reject;
          });
      });
    };

    const calcResults = function(array) {
      return new Promise((resolve, reject) => {
        let nextPlayer;
        let winFound = false;
        let tieFound = false;
        let tieValue = 0;

        if (array.length <= 1) {
          array[0].result = 'solo';
          return resolve(array);
        }

        array.sort((a, b) => {
          return a.strokes - b.strokes;
        });

        array.forEach((player, index) => {
          nextPlayer = array[index + 1];

          if (winFound) return player.result = 'loss';
          if (tieFound) {
            if (player.strokes === tieValue) player.result = 'tie';
            return;
          }

          if (player.strokes < nextPlayer.strokes) {
            player.result = 'win';
            winFound = true;
            return;
          }

          if (player.strokes === nextPlayer.strokes) {
            player.result = 'tie';
            nextPlayer.result = 'tie';
            tieFound = true;
            tieValue = player.strokes;
            return;
          }
        });

        resolve(array);
      });
    };

    return {
      createGame: createGame,
    }
  }]);
};
