'use strict';
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

module.exports = function(userDao) {
  const _userDao = userDao;

  const create = function(username, email, password, firstName, lastName) {
    return new Promise((resolve, reject) => {
      hashPassword(password)
        .then((hashedPassword) => {
          const userData = {
            username: username,
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
          };
          return _userDao.create(userData);
        })
        .then(resolve)
        .catch(reject);
    });
  };

  const authenticateUser = function(emailOrUsername, password) {
    return new Promise((resolve, reject) => {
      _userDao.getByEmailOrUsername(emailOrUsername)
        .then((user) => {
          isMatchingPassword(password, user.password)
            .then((isMatching) => {
              delete user.password;
              isMatching ? resolve(user.firstName) : reject();
            })
            .catch(reject)
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
        .catch(reject)
    });
  };

  return {
    create: create,
    authenticateUser: authenticateUser,
  };
};
