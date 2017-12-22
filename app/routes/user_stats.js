'use strict';

const express = require('express');
const router = express.Router();
const userStatsService = require('../services').userStatsService;

router.post('/create', function(req, res, next) {
  userStatsService.create(req.body.userId)
    .then((userStatsId) => {
      res.json(userStatsId);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error creating user stats.',
      });
    });
});

router.post('/update', function(req, res, next) {
  userStatsService.updateByDocOrUserId(
    req.body.docOrUserId,
    req.body.updateOptions
  )
    .then((someData) => {
      res.status(200).json({
        message: 'User stats successfully updated.',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error updating user stats.',
      });
    });
});

module.exports = router;
