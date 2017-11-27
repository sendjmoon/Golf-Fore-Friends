'use strict';

const express = require('express');
const router = express.Router();
const friendService = require('../services').friendService;

router.get('/all', function(req, res, next) {
  friendService.getAllFriends(req.session.user.email)
    .then((friends) => {
      res.json(friends);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error getting friends data',
      });
    });
});

router.post('/add', function(req, res, next) {
  friendService.addFriend(req.session.user._id, req.body._id)
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
