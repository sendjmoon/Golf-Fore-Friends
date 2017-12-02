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
        })
        .catch((err) => {
          console.log(err);
          reject;
        });
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

  const updateUser = function(emailOrUsername, newData) {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({
        $or: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      }, newData)
        .select('-__v -password')
        .exec()
        .then(() => {
          getByEmailOrUsername(emailOrUsername)
            .then((user) => {
              delete user.password;
              resolve(user);
            });
        })
        .catch(reject);
    });
  };

  const updateManyById = function(usersArray, updateQuery) {
    return new Promise((resolve, reject) => {
      User.updateMany({ _id: { $in: usersArray }}, updateQuery)
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        console.log('error updating many in dao');
        console.log(err);
      });
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
    getByEmailOrUsername: getByEmailOrUsername,
    getAllUsers: getAllUsers,
    updateUser: updateUser,
    updateManyById: updateManyById,
  };
};
