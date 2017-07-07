'use strict';

const Promise = require('bluebird');

module.exports = function(gameDao) {
  const _gameDao = gameDao;

  const create = function(name, course, players) {
    const gameData = {
      name: name,
      course: course,
      players: players,
    };

    return _gameDao.create(gameData);
  };

  return {
    create: create,
  };
};
