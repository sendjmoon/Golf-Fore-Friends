'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  console.log('Courses Route: GET request received');
  res.send('Courses Route: Response to GET request');
});

module.exports = router;
