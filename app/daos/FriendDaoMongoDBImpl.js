'use strict';

const Promise = require('bluebird');
const Friend = require('../models/Friend');
const User = require('../models/User');

module.exports = function() {
  const create = function(friendData) {
    return new Promise((resolve, reject) => {
      const friend = new Friend(friendData);
      friend.save()
      .then((newFriend) => {
        resolve(newFriend);
      })
      .catch(reject);
    })
  };

  const addFriend = function(userId, friendId) {
    return new Promise((resolve, reject) => {
      User.update(
        { _id: userId },
        { $addToSet: { friendIds: friendId }}
      )
        .then((res) => {
          resolve(res);
        })
        .catch(reject);
    });
  };

  const getAllFriends = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      User.findOne({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      })
        .populate({
          path: 'friendIds',
          select: '_id fullName email'
        })
        .exec()
        .then((user) => {
          resolve(user.friendIds);
        })
        .catch(reject);
      });
  };

  return {
    create: create,
    addFriend: addFriend,
    getAllFriends: getAllFriends,
  };
};
