'use strict';

const Promise = require('bluebird');
const utils = require('../utils');

module.exports = function(friendDao) {
  const _friendDao = friendDao;

  const createDoc = function(userId, friendId) {
    return new Promise((resolve, reject) => {
      const friendData = {
        userId: userId,
        friendId: friendId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      _friendDao.create(friendData)
        .then((friend) => {
          resolve(friend);
        })
        .catch(reject);
    });
  };

  const getAllFriends = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _friendDao.getAllFriends(emailOrUsername)
        .then((friends) => {
          resolve(friends);
        })
        .catch(reject);
    });
  };

  const addFriend = function(userIdOne, userIdTwo) {
    return new Promise((resolve, reject) => {
      createDoc(userIdOne, userIdTwo)
        .then((friendDocTwo) => {
          _friendDao.addFriend(userIdOne, friendDocTwo._id)
            .then((res) => {
              if (res.nModified === 0) reject();
              else createDoc(userIdTwo, userIdOne)
                .then((friendDocOne) => {
                  _friendDao.addFriend(userIdTwo, friendDocOne._id)
                    .then((res) => {
                      res.nModified === 0 ? reject() : resolve();
                    });
                });
            });
        })
        .catch(reject);
    });
  };

  return {
    getAllFriends: getAllFriends,
    addFriend: addFriend,
  }
};
