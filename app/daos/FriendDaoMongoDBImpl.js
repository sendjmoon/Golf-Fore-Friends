'use strict';

const Promise = require('bluebird');
const User = require('../models/User');

module.exports = function() {
  const getFriendList = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      User.findOne({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },{
        password: 0,
      })
        .populate('friendIds')
        .exec()
        .then((user) => {
          let friendList = user.friendIds;
          resolve(friendList);
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
    getFriendList: getFriendList,
    addFriend: addFriend,
  };
};
