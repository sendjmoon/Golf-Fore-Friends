'use strict';

const Promise = require('bluebird');
const User = require('../models/User');

module.exports = function() {
  const getFriendsList = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      User.findOne({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      })
        .populate('friendIds', '-password')
        .exec()
        .then((user) => {
          resolve(user.friendIds);
        })
        .catch(reject);
      });
  };

  const addFriend = function(user, friendId) {
    return new Promise((resolve, reject) => {
      User.update({
        email: user.email,
      },{
        $addToSet: {
          friendIds: friendId
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch(reject);
    });
  };

  return {
    getFriendsList: getFriendsList,
    addFriend: addFriend,
  };
};
