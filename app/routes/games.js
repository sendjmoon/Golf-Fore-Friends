'use strict';

const express = require('express');
const router = express.Router();
const gameService = require('../services').gameService;

router.post('/create', function(req, res, next) {
  gameService.create(
    req.body.name,
    req.body.location,
    req.body.datePlayed,
    req.body.players
  )
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error creating game',
      });
    });
});

router.post('/update', function(req, res, next) {
  gameService.updateById(req.body.gameId, req.body.updateOptions)
    .then(() => {
      res.status(200).json({
        message: 'Game update successful.',
      });
    })
    .catch(() => {
      res.status(500).json({
        error: 'Error updating game.',
      });
    });
});

module.exports = router;
