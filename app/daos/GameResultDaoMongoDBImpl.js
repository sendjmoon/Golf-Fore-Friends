'use strict';

const Promise = require('bluebird');
const GameResult = require('../models/GameResult');

module.exports = function() {
  const create = function(resultsData) {
    return new Promise((resolve, reject) => {
      GameResult.create(resultsData)
        .then((newResults) => {
          resolve(newResults.toObject());
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  }

  return {
    create: create,
  }
}
