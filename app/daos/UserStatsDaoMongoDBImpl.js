'use strict';

const Promise = require('bluebird');
const UserStats = require('../models/UserStats');

module.exports = function() {
  const create = function(userId) {
    return new Promise((resolve, reject) => {
      UserStats.create({ userId: userId })
      .then((newUserStats) => {
        resolve(newUserStats.toObject());
      })
      .catch((err) => {
        console.log(err);
        reject;
      });
    });
  };

  return {
    create: create,
  }
}
