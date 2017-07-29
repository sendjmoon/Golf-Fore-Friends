'use strict';
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

module.exports = function(userDao) {
  const _userDao = userDao;

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
              isMatching ? resolve(user) : reject();
            })
            .catch(reject);
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

  const getAllUsers = function(currentUser) {
    return new Promise((resolve, reject) => {
      _userDao.getUsers(currentUser)
        .then((users) => {
          resolve(users);
        })
        .catch(reject);
    });
  };

  const checkFriendExists = function() {

  };

  const addFriend = function(friendEmailOrUsername, userEmailOrUsername) {
    return new Promise((resolve, reject) => {
      _userDao.getByEmailOrUsername(userEmailOrUsername)
        .then((user) => {
          _userDao.getByEmailOrUsername(friendEmailOrUsername)
          .then((friend) => {
            console.log('user');
            console.log(user);
            console.log('friend');
            console.log(friend);
          })
          .catch(reject);
        })
        .catch(reject);
    });
  };

  return {
    create: create,
    authenticateUser: authenticateUser,
    getAllUsers: getAllUsers,
    addFriend: addFriend,
  };
};
