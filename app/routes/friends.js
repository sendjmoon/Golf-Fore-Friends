'use strict';

const express = require('express');
const router = express.Router();
const friendService = require('../services').friendService;

router.get('/list', function(req, res, next) {
  friendService.getFriendList(req.session.user.email)
    .then((friendList) => {
      resolve(friendList);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error getting friends list',
      });
    });
});

module.exports = router;
