'use strict';
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

module.exports = function(userDao) {
  const _userDao = userDao;
  const queryOptions = {};

  const create = function(username, fullName, email, password) {
    return new Promise((resolve, reject) => {
      hashPassword(password)
        .then((hashedPassword) => {
          const userData = {
            username: username,
            fullName: fullName,
            email: email,
            password: hashedPassword,
          };
          _userDao.create(userData)
            .then((newUser) => {
              delete newUser.password;
              resolve(newUser);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  };

  const authenticateUser = function(emailOrUsername, password) {
    return new Promise((resolve, reject) => {
      _userDao.getByEmailOrUsername(emailOrUsername)
        .then((user) => {
          return isMatchingPassword(password, user.password)
            .then((isMatching) => {
              delete user.password;
              isMatching ? resolve(user) : reject();
            });
        })
        .catch(reject);
    });
  }

  const hashPassword = function(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 6)
        .then(resolve)
        .catch(reject);
    });
  };

  const isMatchingPassword = function(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash)
        .then(resolve)
        .catch(reject);
    });
  };

  const getAllUsers = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _userDao.getAllUsers(emailOrUsername)
        .then((users) => {
          resolve(users);
        })
        .catch(reject);
    });
  };

  const getUser = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _userDao.getByEmailOrUsername(emailOrUsername)
        .then((user) => {
          delete user.password;
          resolve(user);
        })
        .catch(reject);
    });
  };

  const update = function(emailOrUsername, updateData) {
    return new Promise((resolve, reject) => {
      _userDao.update(emailOrUsername, updateData)
        .then(resolve)
        .catch(reject);
    });
  };

  const updateManyById = function(usersArray, updateQuery) {
    return _userDao.updateManyById(usersArray, updateQuery);
  };

  return {
    create: create,
    authenticateUser: authenticateUser,
    getAllUsers: getAllUsers,
    getUser: getUser,
    update: update,
    updateManyById: updateManyById,
  };
};
