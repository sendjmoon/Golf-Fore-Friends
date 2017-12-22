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

  const updateByDocOrUserId = function(docOrUserId, updateOptions) {
    return _userStatsDao.updateByDocOrUserId(docOrUserId, updateOptions);
  }

  return {
    create: create,
    updateByDocOrUserId: updateByDocOrUserId,
  }
}
