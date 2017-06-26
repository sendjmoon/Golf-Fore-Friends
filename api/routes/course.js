'use strict';

const express = require('express');
const router = express.Router();
const courseService = require('../services').courseService;

router.get('/', function(req, res, next) {
  res.send('GET request: success');
});

router.post('/create', function(req, res, next) {
  courseService.create(req.body.name, req.body.location, req.body.scorecard)
    .then((course) => {
      res.json(course);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error creating course. Try again.'
      });
    });
});

module.exports = router;
