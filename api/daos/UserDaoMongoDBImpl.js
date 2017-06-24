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

  return {
    create: create,
  };
};
