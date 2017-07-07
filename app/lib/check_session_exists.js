'use strict';

module.exports = function(req, res, next) {
  req.sessionID ? res.redirect('/#!/signin') : res.redirect('/#!/signup');
};
