'use strict';

const Promise = require('bluebird');
const utils = require('../utils');

module.exports = function(gameDao) {
  const _gameDao = gameDao;

  const create = function(name, players) {
    return new Promise((resolve, reject) => {
      const gameData = {
        name: name,
        players: players,
        publicId: `${utils.generateHash(4)}-${name.toLowerCase().split(' ').join('-')}`,
      };
      _gameDao.create(gameData)
        .then((game) => {
          resolve(game);
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

  const getGames = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _gameDao.getGames(emailOrUsername)
        .then((games) => {
          resolve(games);
        })
        .catch(reject);
    });
  }

  return {
    create: create,
    getById: getById,
    getByPublicId: getByPublicId,
    getGames: getGames,
  };
};
