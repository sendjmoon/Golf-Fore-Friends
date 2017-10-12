'use strict';

const Promise = require('bluebird');

module.exports = function(gameDao) {
  const _gameDao = gameDao;

  const create = function(name, players) {
    return new Promise((resolve, reject) => {
      const gameData = {
        name: name,
        players: players,
      };
      _gameDao.create(gameData)
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
    getGames: getGames,
  };
};
