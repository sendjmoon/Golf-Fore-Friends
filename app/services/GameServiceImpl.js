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
          console.log('resolved');
          resolve(game);
        })
        .catch(reject);
    });
  };

  return {
    create: create,
  };
};
