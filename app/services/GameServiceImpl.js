'use strict';

const Promise = require('bluebird');
const utils = require('../utils');

module.exports = function(gameDao) {
  const _gameDao = gameDao;
  const queryOptions = {};

  const create = function(name, location, datePlayed, playersArray) {
    return new Promise((resolve, reject) => {
      const newGameData = {
        name: name,
        location: location,
        datePlayed: new Date(datePlayed),
        publicId: `${utils.generateHash(4)}-${name.toLowerCase().split(' ').join('')}`,
      };
      _gameDao.create(newGameData)
        .then((newGame) => {
          createGameResults(newGame._id, playersArray)
            .then((newResults) => {
              queryOptions.pushResults = {
                $pushAll: { results: newResults },
              };
              _gameDao.updateByPublicId(newGame.publicId, queryOptions.pushResults)
                .then((updatedGame) => {
                  resolve(updatedGame);
                });
            });
        })
        .catch((err) => {
          console.log(err);
          reject;
        });
    });
  };

  const createGameResults = function(gameId, resultsArray) {
    return new Promise((resolve, reject) => {
      console.log('results array');
      console.log(resultsArray);
      resultsArray.forEach((player) => {
        player.gameId = gameId;
        player.playerId = player._id;
        player.createdAt = Date.now();
        player.updatedAt = Date.now();
        return delete player._id;
      });
      _gameDao.createGameResults(resultsArray)
        .then((newResults) => {
          resolve(newResults);
        })
        .catch(reject);
    });
  };

  const getById = function(gameId) {
    return new Promise((resolve, reject) => {
      _gameDao.getById(gameId)
        .then((game) => {
          resolve(game);
        })
        .catch(reject);
    });
  };

  const getByPublicId = function(publicId) {
    return new Promise((resolve, reject) => {
      _gameDao.getByPublicId(publicId)
        .then((game) => {
          resolve(game);
        })
        .catch(reject);
    });
  };

  const getAllByPublicId = function(publicIdArray) {
    return new Promise((resolve, reject) => {
      _gameDao.getAllByPublicId(publicIdArray)
        .then((games) => {
          games = games.filter((game) => {
            return game;
          });
          resolve(games);
        })
        .catch(reject);
    });
  };

  const getGames = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _gameDao.getGames(emailOrUsername)
        .then((games) => {
          resolve(games);
        })
        .catch(reject);
    });
  };

  return {
    create: create,
    getById: getById,
    getByPublicId: getByPublicId,
    getAllByPublicId: getAllByPublicId,
    getGames: getGames,
  };
};
