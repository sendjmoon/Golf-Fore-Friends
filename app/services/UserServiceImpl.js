'use strict';
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  }

  const getByEmailOrUsername = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      _userDao.getByEmailOrUsername(emailOrUsername)
        .then((user) => {
          delete user.password;
          resolve(user);
        })
        .catch(reject);
    });
  }

  const updateByEmailOrUsername = function(emailOrUsername, updateOptions) {
    return _userDao.updateByEmailOrUsername(emailOrUsername, updateOptions);
  }

  const updateManyById = function(userIds, updateOptions) {
    return _userDao.updateManyById(userIds, updateOptions);
  }


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
  }

  const isMatchingPassword = function(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash)
        .then(resolve)
        .catch(reject);
    });
  }

  const getAllOtherUsers = function(email) {
    return _userDao.getAllOtherUsers(email);
  }

  const createJwt = function(emailOrUsername) {
    return new Promise((resolve, reject) => {
      let token = jwt.sign(emailOrUsername, process.env.APP_SECRET, { algorithm: 'HS256' }, (err, token) => {
        err ? reject(err) : resolve(token);
      });
    });
  }

  return {
    create: create,
    getByEmailOrUsername: getByEmailOrUsername,
    updateByEmailOrUsername: updateByEmailOrUsername,
    updateManyById: updateManyById,
    authenticateUser: authenticateUser,
    getAllOtherUsers: getAllOtherUsers,
    createJwt: createJwt,
  };
};
