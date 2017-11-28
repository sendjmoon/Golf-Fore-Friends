'use strict';

const Promise = require('bluebird');

module.exports = function(friendDao) {
  const _friendDao = friendDao;

  const getAllFriends = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _friendDao.getAllFriends(emailOrUsername)
        .then((friends) => {
          resolve(friends);
        })
        .catch(reject);
    });
  };

  const addFriend = function(userId, friendId) {
    return new Promise((resolve, reject) => {
      userId === friendId ? reject() : true;
      _friendDao.addFriend(userId, friendId)
        .then((res) => {
          res.nModified === 0 ? reject() : true;
          _friendDao.addFriend(friendId, userId)
            .then(resolve);
        })
        .catch(reject);
    });
  };

  return {
    getAllFriends: getAllFriends,
    addFriend: addFriend,
  }
};
