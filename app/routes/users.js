'use strict';

const express = require('express');
const router = express.Router();
const userService = require('../services').userService;
const checkSessionExists = require('../lib/check_session_exists');

router.get('/', function(req, res, next) {
  userService.getAllUsers(req.session.user)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error getting users.',
      });
    });
});

router.post('/signup', function(req, res, next) {
  userService.create(
      req.body.username,
      req.body.fullName,
      req.body.email,
      req.body.password
    )
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

router.post('/signin', function(req, res, next) {
  userService.authenticateUser(
      req.body.emailOrUsername,
      req.body.password
    )
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
  req.session = null;
  res.json({
    message: 'signed out',
  });
});

module.exports = router;
