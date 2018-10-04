'use strict';

const Promise = require('bluebird');
const utils = require('../utils');

module.exports = function(friendDao) {
  const _friendDao = friendDao;

  const createDoc = function(userId, newFriendId, newFriendStatsId) {
    return new Promise((resolve, reject) => {
      const friendData = {
        userId: userId,
        friendId: newFriendId,
        stats: newFriendStatsId,
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
    return _friendDao.getAllFriends(emailOrUsername);
  };

  //TODO: refactor to avoid callback hell
  const addFriend = function(userOneId, userOneStatsId, userTwoId, userTwoStatsId) {
    return new Promise((resolve, reject) => {
      createDoc(userOneId, userTwoId, userTwoStatsId)
        .then((userTwoDoc) => {
          _friendDao.addFriend(userOneId, userTwoDoc._id)
            .then((res) => {
              if (res.nModified === 0) reject();
              else createDoc(userTwoId, userOneId, userOneStatsId)
                .then((userOneDoc) => {
                  _friendDao.addFriend(userTwoId, userOneDoc._id)
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
