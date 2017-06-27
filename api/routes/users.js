'use strict';

const express = require('express');
const router = express.Router();
const userService = require('../services').userService;

router.post('/register', function(req, res, next) {
  userService.create(req.body.username, req.body.email, req.body.password, req.body.firstName, req.body.lastName)
    .then((user) => {
      delete user.password;
      req.session.user = user;
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error creating user. Try again.',
      });
    });
});

router.post('/login', function(req, res, next) {
  userService.authenticateUser(req.body.emailOrUsername, req.body.password)
    .then((user) => {
      delete user.password;
      req.session.user = user;
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Incorrect username or password. Try again.',
      });
    });
});

router.get('/signout', function(req, res, next) {
  req.session.user = null;
  res.json({
    message: 'signed out'
  });
});

module.exports = router;
