'use strict';

const Promise = require('bluebird');
const User = require('../models/User');

module.exports = function() {
  const getFriendsData = function(emailOrUsername, options) {
    return new Promise((resolve, reject) => {
      User.findOne({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      })
        .populate({ path: 'friendIds' })
        .exec()
        .then((friendsData) => {
          console.log('Friends Data');
          console.log(friendsData);
          resolve(friendsData.friendIds);
        })
        .catch(reject);
      });
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

  return {
    getFriendsData: getFriendsData,
    addFriend: addFriend,
  };
};
