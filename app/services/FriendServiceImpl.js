'use strict';

const Promise = require('promise');

module.exports = function(friendDao) {
  const _friendDao = friendDao;

  const getFriendsData = function(emailOrUsername, options) {
    return new Promise((resolve, reject) => {
      _friendDao.getFriendsData(emailOrUsername, options)
        .then((friendsData) => {
          resolve(friendsData);
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
    getFriendsData: getFriendsData,
    addFriend: addFriend,
  }
};
