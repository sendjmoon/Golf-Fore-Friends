'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('get route for user');
});

module.exports = router;
