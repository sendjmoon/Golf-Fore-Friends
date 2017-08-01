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
        error: 'Error getting users.'
      });
    });
});

router.post('/signup', function(req, res, next) {
  userService.create(req.body.username, req.body.fullName, req.body.email, req.body.password)
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

router.get('friends/all'), function(req, res, next) {
  userService.getAllFriends(req.session.user.email)
    .then((res) => {
      console.log('got friends');
      res.json(res);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error trying to get friends list.',
      });
    });
};

router.post('/friends/add', function(req, res, next) {
  userService.addFriend(req.session.user, req.body)
    .then((friend) => {
      res.json(friend);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error adding friend.',
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
