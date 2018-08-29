'use strict';

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  return new Promise((resolve, reject) => {
    let token = req.cookies.token;
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) reject();
      req.body.decoded = decoded;
      resolve(next());
    });
  });
}
