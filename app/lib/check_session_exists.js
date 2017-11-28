'use strict';

module.exports = function(req, res, next) {
  req.session.user ? console.log('session found') : console.log('no session found');
  next();
};
