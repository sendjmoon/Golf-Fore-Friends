'use strict';

const express = require('express');
const router = express.Router();
const commentService = require('../services').commentService;

router.post('/create', function(req, res, next) {
  commentService.create(
    req.body.gameId,
    req.body.authorId,
    req.body.authorName,
    req.body.content
  )
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error creating comment.',
      });
    });
});

module.exports = router;
