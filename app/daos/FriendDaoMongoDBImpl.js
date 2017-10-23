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

  const addFriend = function(emailOrUsername, friendId) {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },{
        $addToSet: {
          friendIds: friendId,
        },
      })
        .populate('_id', '-password -__v')
        .exec()
        .then((user) => {
          User.findOneAndUpdate({
            _id: friendId,
          }, {
            $addToSet: {
              friendIds: user._id,
            },
          })
            .then((res) => {
              console.log(res);
              resolve(res);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  };

  return {
    getFriendsList: getFriendsList,
    addFriend: addFriend,
  };
};
