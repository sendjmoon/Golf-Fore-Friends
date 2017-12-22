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

module.exports = router;
