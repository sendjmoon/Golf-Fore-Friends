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

  const aggregate = function(matchOptions, groupOptions) {
    return new Promise((resolve, reject) => {
      GameResult.aggregate([
        { $match: matchOptions },
        { $group: groupOptions }
      ])
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
