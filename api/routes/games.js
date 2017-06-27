'use strict';

const express = require('express');
const router = express.Router();
const gameService = require('../services').gameService;

router.post('/create', function(req, res, next) {
  const gameData = {};
  gameData.name = req.body.name;
  gameData.course = req.body.course;
  gameData.players = [];
  gameData.players[0] = {
    player: req.session.user._id,
    score: 100,
  };

  gameService.create(gameData.name, gameData.course, gameData.players)
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.status(400).json({
        error: 'error creating game'
      });
    });
});

module.exports = router;
