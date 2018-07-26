'use strict';

const express = require('express');
const router = express.Router();
const userService = require('../services').userService;

//TODO: refactor to middleware. jwt-auth?
router.get('/check-session', function(req, res, next) {
  if (req.session.user) {
    userService.getByEmailOrUsername(req.session.user.email)
      .then((user) => {
        req.session.user = user;
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
          error: 'Error getting user.',
        });
      });
  }
  else res.status(401).json({
    error: 'Unauthorized.',
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
  console.log(req);
  userService.create(
      req.body.username,
      req.body.fullName,
      req.body.email,
      req.body.password
    )
    .then((user) => {
      req.session.user = user;
      user = {
        email: user.email,
        _id: user._id,
      }
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
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
      req.session.user = user;
      res.status(200).json({
        message: 'Signin successful.',
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
  req.session.user = null;
  res.json({
    message: 'Signed out.',
  });
});

module.exports = router;
