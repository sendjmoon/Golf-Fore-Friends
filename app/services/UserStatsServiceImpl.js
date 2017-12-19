'use strict';

const Promise = require('bluebird');

module.exports = function(userStatsDao) {
  const _userStatsDao = userStatsDao;

  const create = function(userId) {
    return new Promise((resolve, reject) => {
      _userStatsDao.create(userId)
        .then((newUserStats) => {
          resolve(newUserStats._id);
        })
        .catch(reject);
    });
  }


  const update = function(docOrUserId, updateOptions) {
    return new Promise((resolve, reject) => {
      _userStatsDao.update(docOrUserId, updateOptions)
        .then(resolve)
        .catch(reject);
    });
  }

  return {
    create: create,
    update: update,
  }
}
