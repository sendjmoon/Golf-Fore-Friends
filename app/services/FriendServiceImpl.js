'use strict';

const Promise = require('promise');

module.exports = function(friendDao) {
  const _friendDao = friendDao;

  const getFriendList = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _friendDao.getFriendList(emailOrUsername)
        .then((friendList) => {
          friendList = friendList.filter((user) => {
            user.password = '';
            return user;
          });
          resolve(friendList);
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
    getFriendList: getFriendList,
    addFriend: addFriend,
  }
};
