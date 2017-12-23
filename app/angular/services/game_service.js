'use strict';

module.exports = function(app) {
  app.factory('GameService', ['$rootScope', '$route', '$http', 'ResultService', 'UserService', 'StatsService', function($rs, $route, $http, resultService, userService, statsService) {

    const newGame = function(gameData) {
      return new Promise((resolve, reject) => {
        createGameAndResults(gameData)
          .then((newGameData) => {
            updateGameAndUsers(newGameData.gameId, newGameData.results)
              .then(resolve)
              .catch(reject);
          })
          .catch(reject);
      });
    };

    const createGameAndResults = function(gameData) {
      return new Promise((resolve, reject) => {
        create(gameData)
          .then((newGame) => {
            resultService.create(newGame._id, gameData.players)
              .then((results) => {
                let newGameData = {
                  gameId: newGame._id,
                  results: results,
                };
                resolve(newGameData);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    };

    const updateGameAndUsers = function(gameId, resultsArray) {
      return new Promise((resolve, reject) => {
        let resultIds = [];
        let userIds = [];
        let gameUpdateData = {};
        let userUpdateData = {};

        resultIds = resultsArray.map((result) => {
          return result._id;
        });

        userIds = resultsArray.map((result) => {
          return result.playerId;
        })

        gameUpdateData.gameId = gameId;
        gameUpdateData.updateOptions = {
          $addToSet: { results: { $each: resultIds }},
        };

        userUpdateData.usersIds = userIds;
        userUpdateData.updateOptions = {
          $addToSet: { gameIds: gameId },
        };

        //TODO: refactor to mitigate callback hell.
        update(gameUpdateData)
          .then(() => {
            userService.updateManyById(userUpdateData)
              .then(() => {
                statsService.updateManyByDocOrUserId(resultsArray)
                  .then(() => {
                    resolve();
                    $route.reload();
                  })
                  .catch(reject);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    };

    const create = function(gameData) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/games/create`, gameData)
          .then((newGame) => {
            resolve(newGame.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    };

    const update = function(updateData) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/games/update`, updateData)
          .then((newData) => {
            resolve(newData.data);
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

    return {
      create: create,
      newGame: newGame,
    }
  }]);
};
