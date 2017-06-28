'use strict';

const Promise = require('bluebird');
const Game = require('../models/Game');

module.exports = function() {
  const create = function(gameData) {
    return new Promise((resolve, reject) => {
      const game = new Game(gameData);
      game.createdAt = Date.now();
      game.save()
        .then((createdGame) => {
          Game.findById(createdGame.id)
            .select('_id -__v')
            .populate('players.player', '-_id username email firstName lastName')
            .exec()
            .then((newGame) => {
              resolve(newGame.toObject());
            })
            .catch(reject);
        })
        .catch(reject);
    });
  };

  return {
    create: create,
  };
};
