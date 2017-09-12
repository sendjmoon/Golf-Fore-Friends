'use strict';

const express = require('express');
const router = express.Router();
const gameService = require('../services').gameService;

router.post('/create', function(req, res, next) {
  const gameData = {};
  gameData.name = req.body.name;
  gameData.players = req.body.players;
  console.log('game data');
  console.log(gameData);
  gameService.create(gameData)
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error creating game',
      });
    });
});

module.exports = router;
