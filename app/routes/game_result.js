'use strict';

const express = require('express');
const router = express.Router();
const gameResultService = require('../services').gameResultService;

router.post('/create', function(req, res, next) {
  gameResultService.create(req.body.gameId, req.body.datePlayed, req.body.resultsArray)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error creating game results.',
      });
    });
});

router.get('/:userId', function(req, res, next) {
  gameResultService.getAllByUserId(req.params.userId)
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error getting game results.',
      });
    })
});

router.post('/aggregate', function(req, res, next) {
  gameResultService.aggregate(req.body.matchOptions, req.body.groupOptions)
    .then((aggregatedData) => {
      res.json(aggregatedData);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error aggregating data.',
      });
    });
});

module.exports = router;
