'use strict';

const Promise = require('bluebird');
const Game = require('../models/Game');

module.exports = function() {
  const create = function(gameData) {
    return new Promise((resolve, reject) => {
      const game = new Game(gameData);
      game.createdAt = Date.now();
      game.updatedAt = Date.now();
      game.save()
        .then((game) => {
          Game.findById(game.id)
            .select('_id -__v')
            // .populate('players', '-_id fullName email username')
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
