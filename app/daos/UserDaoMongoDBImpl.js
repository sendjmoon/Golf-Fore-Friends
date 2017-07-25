'use strict';

const Promise = require('bluebird');
const User = require('../models/User');

module.exports = function() {
  const create = function(userData) {
    return new Promise((resolve, reject) => {
      const user = new User(userData);
      user.createdAt = Date.now();
      user.updatedAt = Date.now();
      user.save()
        .then((createdUser) => {
          User.findById(createdUser.id)
            .select('-__v')
            .exec()
            .then((newUser) => {
              resolve(newUser.toObject());
            })
            .catch(reject)
        })
        .catch(reject);
    });
  };

  const getByEmailOrUsername = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      User.findOne({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      })
        .select('-__v')
        .exec()
        .then((user) => {
          resolve(user.toObject());
        })
        .catch(reject);
      });
  };

  const getUsers = function(currentUser) {
    return new Promise((resolve, reject) => {
      User.find({
        fullName: { $ne: currentUser },
      },
      {
        password: 0,
      })
        .select('-__v')
        .exec()
        .then((users) => {
          resolve(users);
        })
        .catch(reject);
    });
  };

  const addFriend = function(friendId, user) {
    return new Promise((resolve, reject) => {
      User.findById(user._id)
        .then((user) => {
          let friendsArray = user.friendIds;
          friendsArray.push(friendId);
          user.update({ friendIds: friendsArray })
          .then((res) => {
            User.findById(friendId)
              .then((friend) => {
                resolve(friend);
              })
              .catch(reject);
          })
          .catch(reject);
        })
        .catch(reject);
    })
  }

  return {
    create: create,
    getByEmailOrUsername: getByEmailOrUsername,
    getUsers: getUsers,
    addFriend: addFriend,
  };
};
