'use strict';

const Promise = require('bluebird');

module.exports = function(gameDao) {
  const _gameDao = gameDao;

  const create = function(name, course) {
    const gameData = {
      name: name,
      course: course,
    };

    return _gameDao.create(gameData);
  };

  return {
    create: create,
  };
};
