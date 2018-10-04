'use strict';

module.exports = function(app) {
  app.factory('GameService', ['$rootScope', '$route', '$http', 'ResultService', 'UserService', 'StatsService', function($rs, $route, $http, resultService, userService, statsService) {

    const data = {
      allGames: {},
    }

    const newGame = function(gameData) {
      return new Promise((resolve, reject) => {
        createGameAndResults(gameData)
          .then((newGameData) => {
            updateGameAndUsers(newGameData.gameId, newGameData.results)
              .then(resolve);
          })
          .catch(reject);
      });
    }

    const createGameAndResults = function(gameData) {
      return new Promise((resolve, reject) => {
        create(gameData)
          .then((newGame) => {
            resultService.create(newGame._id, gameData.datePlayed, gameData.players)
              .then((results) => {
                let newGameData = {
                  gameId: newGame._id,
                  results: results,
                }
                
                resolve(newGameData);
              });
          })
          .catch(reject);
      });
    }

    const updateGameAndUsers = function(gameId, resultsArray) {
      return new Promise((resolve, reject) => {
        let resultIds = [];
        let userIds = [];
        let gameUpdateOptions = {};
        let userUpdateOptions = {};

        resultIds = resultsArray.map((result) => {
          return result._id;
        });

        userIds = resultsArray.map((result) => {
          return result.playerId;
        })

        gameUpdateOptions = {
          $addToSet: { results: { $each: resultIds }},
        };

        userUpdateOptions = {
          $addToSet: { gameIds: gameId },
        };

        updateById(gameId, gameUpdateOptions)
          .then(userService.updateManyById(userIds, userUpdateOptions))
          .then(statsService.updateManyByDocOrUserId(resultsArray))
          .then(updatePlayers(userIds))
          .then(resolve)
          .catch(reject);
      });
    }

    const updatePlayers = function(userIds) {
      userIds.forEach((userId) => {
        statsService.updateHandicap(userId)
          .then(statsService.updateWinRatio(userId));
      });
    }

    const create = function(gameData) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/games/create`, gameData)
          .then((newGame) => {
            resolve(newGame.data);
          })
          .catch(reject);
      });
    }

    const getAllById = function(gameIds) {
      return new Promise((resolve, reject) => {
        const gameIdData = {
          gameIds: gameIds,
        }

        $http.post(`${$rs.baseUrl}/games/all`, gameIdData)
          .then((games) => {
            games = games.data;
            data.allGames.games = games;
            resolve(games);
          })
          .catch(reject);
      });
    }

    const updateById = function(gameId, updateOptions) {
      return new Promise((resolve, reject) => {
        const updateData = {
          gameId: gameId,
          updateOptions: updateOptions,
        }

        $http.post(`${$rs.baseUrl}/games/update`, updateData)
          .then((newData) => {
            resolve(newData.data);
          })
          .catch(reject);
      });
    }

    const getByPublicId = function(gameId) {
      return new Promise((resolve, reject) => {
        $http.get($rs.baseUrl + '/games/' + gameId)
          .then((game) => {
            resolve(game.data);
          })
          .catch(reject);
      });
    }


    return {
      create: create,
      getAllById: getAllById,
      updateById: updateById,
      newGame: newGame,
      data: data,
    }
  }]);
};
