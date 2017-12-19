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

  return {
    create: create,
  }
}
