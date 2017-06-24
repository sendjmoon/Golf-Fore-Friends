'use strict';

const express = require('express');
const router = express.Router();
const userService = require('../services').userService;

router.get('/', function(req, res, next) {
  res.send('get route for user');
});

router.post('/create', function(req, res, next) {
  userService.create(req.body.username, req.body.password, req.body.email, req.body.firstName, req.body.lastName)
    .then((user) => {
      delete user.password;
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error creating user. Try again.'
      });
    });
});

module.exports = router;
