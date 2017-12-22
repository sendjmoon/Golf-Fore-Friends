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
        .catch(reject);
    });
  };

  const updateByDocOrUserId = function(docOrUserId, updateOptions) {
    return new Promise((resolve, reject) => {
      UserStats.findOneAndUpdate(
        {
          $or: [
            { _id: docOrUserId },
            { userId: docOrUserId },
          ],
        },
        updateOptions,
        { new: true }
      )
        .then(resolve)
        .catch(reject);
    });
  };

  return {
    create: create,
    updateByDocOrUserId: updateByDocOrUserId,
  }
}
