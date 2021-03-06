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

  const getByDocOrUserId = function(docOrUserId) {
    return new Promise((resolve, reject) => {
      UserStats.findOne({
        $or: [
          { _id: docOrUserId },
          { userId: docOrUserId },
        ],
      })
        .select('-__v -_id -userId')
        .exec()
          .then((userStats) => {
            resolve(userStats);
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
    getByDocOrUserId: getByDocOrUserId,
    updateByDocOrUserId: updateByDocOrUserId,
  };
};
