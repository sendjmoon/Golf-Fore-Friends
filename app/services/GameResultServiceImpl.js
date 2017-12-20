'use strict';

const Promise = require('bluebird');

module.exports = function(gameResultDao) {
  const _gameResultDao = gameResultDao;

  const create = function(resultsData) {
    return new Promise((resolve, reject) => {
      _gameResultDao.create(resultsData)
        .then(resolve)
        .catch(reject);
    });
  }

  return {
    create: create,
  }
}
