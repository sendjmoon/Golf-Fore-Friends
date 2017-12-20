'use strict';

const Promise = require('bluebird');
const GameResult = require('../models/GameResult');

module.exports = function() {
  const create = function(resultsArray) {
    console.log(resultsArray);
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

  return {
    create: create,
  }
}
