'use strict';

const express = require('express');
const router = express.Router();
const userService = require('../services').userService;

router.get('/', function(req, res, next) {
  res.send('get route for user');
});

router.post('/create', function(req, res, next) {
  userService.create(req.body.username, req.body.email, req.body.password, req.body.firstName, req.body.lastName)
    .then((user) => {
      delete user.password;
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
    .then((firstName) => {
      res.send('Welcome back ' + firstName + '!');
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Authentication error. Try again.',
      });
    });
});

module.exports = router;
