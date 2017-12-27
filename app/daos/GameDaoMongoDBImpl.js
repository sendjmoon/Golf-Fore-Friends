'use strict';

const Promise = require('bluebird');
const Game = require('../models/Game');
const User = require('../models/User');

module.exports = function() {
  const create = function(gameData) {
    return new Promise((resolve, reject) => {
      const game = new Game(gameData);
      game.createdAt = Date.now();
      game.updatedAt = Date.now();
      game.save()
        .then((createdGame) => {
          Game.findById(createdGame._id)
            .select('-__v')
            .exec()
            .then((newGame) => {
              resolve(newGame.toObject());
            });
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  //TODO: error handling. what if game is found but nothing is updated?
  const updateById = function(gameId, updateOptions) {
    return new Promise((resolve, reject) => {
      Game.findOneAndUpdate({ _id: gameId }, updateOptions)
        .then((res) => {
          res === null ? reject() : resolve();
        })
        .catch(reject);
    });
  };

  const getAllById = function(gameIds) {
    return new Promise((resolve, reject) => {
      Game.find({
        _id: { $in: gameIds },
      })
        .select('-__v')
        .populate({
          path: 'results',
          select: '-__v',
        })
        .exec()
          .then((games) => {
            resolve(games);
          })
          .catch(reject);
    });
  }

  return {
    create: create,
    updateById: updateById,
    getAllById: getAllById,
  };
};
