'use strict';

const Promise = require('bluebird');
const User = require('../models/User');

module.exports = function() {
  const addFriend = function() {

  };

  const getFriendList = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      User.findOne({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      }, {
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

  return {
    getFriendList: getFriendList,
  };
};
