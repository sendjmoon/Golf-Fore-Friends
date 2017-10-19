'use strict';

const express = require('express');
const router = express.Router();
const gameService = require('../services').gameService;
const userService = require('../services').userService;

router.get('/all', function(req, res, next) {
  gameService.getGames(req.session.user.email)
    .then((games) => {
      res.json(games);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error getting games',
      });
    });
});

router.post('/create', function(req, res, next) {
  gameService.create(req.body.name, req.body.players)
    .then((game) => {
      userService.getUser(req.session.user.email)
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          res.status(500).json({
            error: 'error getting user',
          })
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error creating game',
      });
    });
});

module.exports = router;
