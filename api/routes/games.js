'use strict';

const express = require('express');
const router = express.Router();
const gameService = require('../services').gameService;

router.post('/create', function(req, res, next) {
  gameService.create(req.body.name, req.body.course)
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
