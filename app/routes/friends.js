'use strict';

const express = require('express');
const router = express.Router();
const friendService = require('../services').friendService;

router.post('/all', function(req, res, next) {
  friendService.getAllFriends(req.body.emailOrUsername)
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
  friendService.addFriend(
    req.body._id,
    req.body.stats,
    req.body.userId,
    req.body.statsId
  )
    .then(() => {
      res.status(200).json({
        message: 'success',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error adding friend.',
      });
    });
});

module.exports = router;
