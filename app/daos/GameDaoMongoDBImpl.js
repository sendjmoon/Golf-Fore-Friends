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
              addToUsers(newGame);
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject();
            });
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  const addToUsers = function(game) {
    game.players.forEach((player) => {
      return new Promise((resolve, reject) => {
        User.update({
          _id: player._id,
        },{
          $addToSet: {
            gameIds: game._id,
          },
        })
          .then((res) => {
            resolve(res);
          })
          .catch(reject);
      });
    });
  };

  const getGames = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      User.findOne({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },{
        password: 0,
      })
        .populate('gameIds')
        .exec()
        .then((user) => {
          resolve(user.gameIds);
        })
        .catch(reject);
      });
  };

  return {
    create: create,
    getGames: getGames,
  };
};
