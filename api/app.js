'use strict';

const express = require('express');
const app = express();
const logger = require('morgan');
const errorHandler = require('./lib/error_handler');

const courseRouter = require('./routes/courses');

app.use(logger('dev'));

app.use('/course', courseRouter);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
