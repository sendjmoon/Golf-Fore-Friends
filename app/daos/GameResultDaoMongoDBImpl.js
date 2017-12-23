'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const GameResult = require('../models/GameResult');

module.exports = function() {
  const create = function(resultsArray) {
    return new Promise((resolve, reject) => {
      GameResult.create(resultsArray)
        .then((newResults) => {
          resolve(newResults);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  }

  const aggregate = function(userId, options) {
    return new Promise((resolve, reject) => {
      GameResult.aggregate([
        { $match: { playerId: mongoose.Types.ObjectId(userId) }},
        options,
      ])
        .exec()
          .then((aggregatedData) => {
            resolve(aggregatedData);
          })
          .catch(reject);
    });
  }

  return {
    create: create,
    aggregate: aggregate,
  }
}
