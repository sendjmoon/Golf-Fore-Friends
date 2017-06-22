'use strict';
const express = require('express');
const router = express.Router();
const courseService = require('../services/').courseService;

router.get('/', function(req, res, next) {
  res.send('Courses Route: Response to GET request');
});

router.post('/create', function(req, res, next) {
  courseService.create(req.body.name)
    .then((course) => {
      res.json(course);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'error creating course'
      });
    });
});

module.exports = router;
