'use strict';
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

module.exports = function(userDao) {
  const _userDao = userDao;

  const create = function(username, email, password, firstName, lastName) {
    return new Promise((resolve, reject) => {
      hashPassword.hash(password)
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

  const hashPassword = function(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 6)
        .then(resolve)
        .catch(reject);
    });
  };

  return {
    create: create,
  };
};
