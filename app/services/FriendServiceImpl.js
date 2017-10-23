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

  const addFriend = function(user, friendId) {
    return new Promise((resolve, reject) => {
      _friendDao.addFriend(user, friendId)
        .then((res) => {
          resolve(res.nModified === 0 ? false : true);
        })
        .catch(reject);
    });
  };

  return {
    getFriendsList: getFriendsList,
    addFriend: addFriend,
  }
};
