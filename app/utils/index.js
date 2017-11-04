'use strict';

const crypto = require('crypto');

module.exports = {
  parseDate: function(str) {
    const _str = str.split('T')[0];
    return _str.split('-').reverse().join('-');
  },
  generateHash: function(size) {
    const _size = size && size > 0 ? size : 10;
    return crypto.randomBytes(_size).toString('hex');
  },
};
