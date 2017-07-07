'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Golf Four Friends',
  });
});

module.exports = router;
