'use strict';

const Promise = require('bluebird');
const utils = require('../utils');
const moment = require('moment');

module.exports = function(gameDao) {
  const _gameDao = gameDao;

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
          updateResults(newGame._id, newGame.publicId, playersArray)
            .then((results) => {
              console.log('updated');
              console.log(results);
              resolve(results);
            })
        })
        .catch((err) => {
          console.log(err);
          reject;
        });
    });
  };

  const updateResults = function(gameId, publicId, playersArray) {
    return new Promise((resolve, reject) => {
      console.log('huh?');
      playersArray.forEach((player) => {
        player.gameId = gameId;
        player.playerId = player._id;
        return delete player._id;
      });

      let queryOptions = {
        $addToSet: {
          results: {
            $each: playersArray,
          }
        }
      }

      console.log(queryOptions);

      _gameDao.updateByPublicId(publicId, queryOptions)
      .then((updateData) => {
        resolve(updatedData);
      })
      .catch(reject);
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
