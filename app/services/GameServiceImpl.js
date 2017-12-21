'use strict';

const Promise = require('bluebird');
const utils = require('../utils');

module.exports = function(gameDao) {
  const _gameDao = gameDao;
  const queryOptions = {};

  const create = function(name, location, datePlayed) {
    return new Promise((resolve, reject) => {
      const gameData = {
        name: name,
        location: location,
        datePlayed: new Date(datePlayed),
        publicId: `${utils.generateHash(4)}-${name.toLowerCase().split(' ').join('')}`,
      };
      _gameDao.create(gameData)
        .then((newGame) => {
          const newGameData = {
            _id: newGame._id,
            publicId: newGame.publicId,
          };
          resolve(newGameData);
        })
        .catch(reject);
    });
  };

  const updateById = function(gameId, updateOptions) {
    return _gameDao.updateById(gameId, updateOptions);
  }

  return {
    create: create,
    updateById: updateById,
  };
};
