'use strict';

const Promise = require('bluebird');

module.exports = function(gameResultDao) {
  const _gameResultDao = gameResultDao;

  const create = function(gameId, resultsArray) {
    return new Promise((resolve, reject) => {
      resultsArray.forEach((player) => {
        player.gameId = gameId;
        player.playerId = player._id;
        player.createdAt = Date.now();
        player.updatedAt = Date.now();
        return delete player._id;
      });
      _gameResultDao.create(resultsArray)
        .then((newResults) => {
          resolve(newResults);
        })
        .catch(reject);
    });
  };

  const aggregate = function(userId, options) {
    options = JSON.parse(options);
    return _gameResultDao.aggregate(userId, options);
  };

  return {
    create: create,
    aggregate: aggregate,
  }
}
