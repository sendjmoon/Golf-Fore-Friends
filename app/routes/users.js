'use strict';

const express = require('express');
const router = express.Router();
const userService = require('../services').userService;
const jwt = require('jsonwebtoken');
const jwtAuth = require('../lib/jwt_auth');

router.get('/check-session', jwtAuth, function(req, res, next) {
  if (!req.body.decoded) {
    res.status(500).json({
      error: 'Error authenticating user.'
    });
  }
  userService.getByEmailOrUsername(req.body.decoded)
    .then((user) => {
      res.json({
        userData: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          gameIds: user.gameIds,
          createdAt: user.createdAt,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error authenticating user.'
      });
    });
});

router.post('/', function(req, res, next) {
  userService.getUser(req.body.emailOrUsername)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error getting user.',
      });
    });
});

router.post('/all', function(req, res, next) {
  userService.getAllOtherUsers(req.body.email)
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
      user = {
        email: user.email,
        _id: user._id,
      }
      userService.createJwt(user.email)
        .then((token) => {
          res.cookie('token', token);
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(500).json({
            error: 'Error creating user. Try again.',
          });
        });
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
      userService.createJwt(user.email)
        .then((token) => {
          console.log('SECOND PASSED');
          res.cookie('token', token);
          res.status(200).json(user);
        })
        .catch((err) => {
          console.log('failed');
          res.status(400).json({
            error: 'Error authenticating user.',
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Incorrect username or password. Try again.',
      });
    });
});

router.post('/update', function(req, res, next) {
  userService.updateByEmailOrUsername(
    req.body.emailOrUsername,
    req.body.updateOptions
  )
    .then(() => {
      res.status(200).json({
        message: 'Update successful.',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error updating user.',
      });
    });
});

router.post('/update-many', function(req, res, next) {
  userService.updateManyById(
    req.body.userIds,
    req.body.updateOptions
  )
    .then(() => {
      res.status(200).json({
        message: 'Successfully updated many.',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error updating users.',
      });
    });
});

router.post('/avatar', function(req, res, next) {
  console.log(req.body);
});

router.get('/signout', function(req, res, next) {
  res.cookie('token', null);
  res.json({
    message: 'Signed out.',
  });
});

module.exports = router;
