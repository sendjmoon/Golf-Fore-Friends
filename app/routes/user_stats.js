'use strict';

const express = require('express');
const router = express.Router();
const userStatsService = require('../services').userStatsService;

router.post('/create', function(req, res, next) {
  userStatsService.create(req.body.userId)
    .then((userStatsId) => {
      res.status(200).json(userStatsId);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error creating user stats.',
      });
    });
});

module.exports = router;
