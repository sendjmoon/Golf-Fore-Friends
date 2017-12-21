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
              });
        })
        .catch(reject);
    });
  };

  const updateByEmailOrUsername = function(emailOrUsername, updateData) {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      }, updateData)
        .select('-__v -password')
        .exec()
          .then(resolve)
          .catch(reject);
    });
  };

  const updateManyById = function(userIds, updateOptions) {
    return new Promise((resolve, reject) => {
      User.updateMany({ _id: { $in: userIds }}, updateOptions)
        .then(resolve)
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


  const getAllUsers = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      User.find({
        $or: [
          { email: { $ne: emailOrUsername }},
          { username: { $ne: emailOrUsername }},
        ],
      })
        .select('_id fullName email')
        .exec()
          .then((users) => {
            resolve(users);
          })
          .catch(reject);
    });
  };

  return {
    create: create,
    updateByEmailOrUsername: updateByEmailOrUsername,
    updateManyById: updateManyById,
    getByEmailOrUsername: getByEmailOrUsername,
    getAllUsers: getAllUsers,
  };
};
