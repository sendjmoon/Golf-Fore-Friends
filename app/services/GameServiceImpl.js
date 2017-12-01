'use strict';

const Promise = require('bluebird');
const utils = require('../utils');
const moment = require('moment');

module.exports = function(gameDao) {
  const _gameDao = gameDao;

  const create = function(name, location, datePlayed) {
    return new Promise((resolve, reject) => {
      const gameData = {
        name: name,
        location: location,
        datePlayed: new Date(datePlayed),
        publicId: `${utils.generateHash(4)}-${name.toLowerCase().split(' ').join('')}`,
      };
      _gameDao.create(gameData)
        .then((game) => {
          resolve(game);
        })
        .catch(reject);
    });
  };

  const update = function(publicId, updateData, options) {
    return new Promise((resolve, reject) => {
      const updateData = {
        publicId: publicId,
        updateData: updateData,
        options: options,
      };
      _gameDao.update(updateData)
        .then((res) => {
          console.log('game service layer');
          console.log(res);
          resolve();
        })
        .catch((err) => {
          console.log('err in game service layer');
          console.log(err);
          reject;
        });
    });
  };

  const getById = function(gameId) {
    return new Promise((resolve, reject) => {
      _gameDao.getById(gameId)
        .then((game) => {
          game.playedOn = moment(parseInt(game.playedOn)).format('MMM DD YYYY');
          resolve(game);
        })
        .catch(reject);
    });
  };

  const getByPublicId = function(publicId) {
    return new Promise((resolve, reject) => {
      _gameDao.getByPublicId(publicId)
        .then((game) => {
          game.playedOn = moment(parseInt(game.playedOn)).format('MMM DD YYYY');
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
            let dateString = moment(parseInt(game.playedOn)).format('MMM DD YYYY');
            game.playedOn = dateString;
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
