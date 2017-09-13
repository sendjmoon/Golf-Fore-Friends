'use strict';

const Promise = require('bluebird');
const Game = require('../models/Game');

module.exports = function() {

  const create = function(gameData) {
    return new Promise((resolve, reject) => {
      console.log(gameData);
      const game = new Game(gameData);
      console.log(game);
      game.createdAt = Date.now();
      game.updatedAt = Date.now();
      game.save()
        .then((createdGame) => {
          Game.findById(createdGame.id)
            .select('-__v')
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
