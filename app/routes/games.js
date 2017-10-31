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

router.get('/:publicId', function(req, res, next) {
  gameService.getByPublicId(req.params.publicId)
    .then((game) => {
      console.log(game);
      res.json(game);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error getting game',
      });
    });
});

router.post('/all', function(req, res, next) {
  gameService.getAllByPublicId(req.body.publicIdArray)
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
      res.json(game);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error creating game',
      });
    });
});

module.exports = router;
