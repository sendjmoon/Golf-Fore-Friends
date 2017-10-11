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
          Game.findById(createdGame.id)
            .select('-__v')
            .exec()
            .then((newGame) => {
              console.log('entering foreach');
              newGame.players.forEach((player) => {
                console.log('foreach');
                console.log(player);
                addToUser(player, newGame);
              })
              .then(resolve(newGame));
            })
            .catch(reject);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  const addToUser = function(user, game) {
    let gameId = game._id;
    console.log(gameId);
    console.log('userid');
    console.log(user._id);
    return new Promise((resolve, reject) => {
      User.update({
        _id: user._id,
      }, {
        $addToSet: {
          gameIds: gameId,
        }
      })
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch(reject);
    });
  };

  return {
    create: create,
  };
};
