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
              resolve(newGame);
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

  const getById = function(gameId) {
    return new Promise((resolve, reject) => {
      Game.findById(gameId)
        .select('-__v')
        .exec()
        .then((game) => {
          resolve(game);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  const getByPublicId = function(publicId) {
    return new Promise((resolve, reject) => {
      Game.findOne({
        publicId: publicId,
      })
        .select('-__v')
        .exec()
        .then((game) => {
          resolve(game);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  const getAllByPublicId = function(publicIdArray) {
    return new Promise((resolve, reject) => {
        Game.find({
          publicId: {
            $in: publicIdArray,
          },
        })
          .select('-__v')
          .exec()
          .then((games) => {
            resolve(games);
          })
          .catch((err) => {
            console.log(err);
            reject();
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

  const addToUsers = function(game) {
    game.players.forEach((player) => {
      return new Promise((resolve, reject) => {
        User.update({
          _id: player._id,
        },{
          $addToSet: {
            gameIds: {
              game: game._id,
              publicId: game.publicId,
              strokes: player.strokes,
            },
          },
        })
          .then((res) => {
            resolve(res);
          })
          .catch(reject);
      });
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
