'use strict';

const crypto = require('crypto');

module.exports = {
  generateHash: function(size) {
    const _size = size && size > 0 ? size : 10;
    return crypto.randomBytes(_size).toString('hex');
  }
};
