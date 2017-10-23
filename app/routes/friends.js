'use strict';

const express = require('express');
const router = express.Router();
const friendService = require('../services').friendService;

router.get('/list', function(req, res, next) {
  friendService.getFriendsList(req.session.user.email)
    .then((friendsList) => {
      res.json(friendsList);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error getting friends list',
      });
    });
});

router.post('/add', function(req, res, next) {
  friendService.addFriend(req.session.user.email, req.body)
    .then((friend) => {
      res.json(friend);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error adding friend.',
      });
    });
});

module.exports = router;
