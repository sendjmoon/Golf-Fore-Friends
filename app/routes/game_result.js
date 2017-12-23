'use strict';

const express = require('express');
const router = express.Router();
const gameResultService = require('../services').gameResultService;

router.post('/create', function(req, res, next) {
  gameResultService.create(req.body.gameId, req.body.resultsArray)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error creating game results.',
      });
    });
});

router.post('/aggregate', function(req, res, next) {
  gameResultService.aggregate(req.body.userId, req.body.options)
    .then((aggregatedData) => {
      res.json(aggregatedData);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error getting total.',
      });
    });
});

module.exports = router;
