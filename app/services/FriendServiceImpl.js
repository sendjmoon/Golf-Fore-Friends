'use strict';

const Promise = require('promise');

module.exports = function(friendDao) {
  const _friendDao = friendDao;

  const getFriendList = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _friendDao.getFriendList(emailOrUsername)
        .then((friendList) => {
          resolve(friendList);
        })
        .catch(reject);
    });
  };

  return {
    getFriendList: getFriendList,
  }
};
