'use strict';

const Promise = require('promise');

module.exports = function(friendDao) {
  const _friendDao = friendDao;

  const getFriendsList = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _friendDao.getFriendsList(emailOrUsername)
        .then((friendsList) => {
          resolve(friendsList);
        })
        .catch(reject);
    });
  };

  const addFriend = function(userId, friendId) {
    return new Promise((resolve, reject) => {
      _friendDao.addFriend(userId, friendId)
        .then((res) => {
          _friendDao.addFriend(friendId, userId)
            .then((res) => {
              resolve(res);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  };

  return {
    getFriendsList: getFriendsList,
    addFriend: addFriend,
  }
};
