'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./lib/error_handler');

const courseRouter = require('./routes/courses');
const gameRouter = require('./routes/games');
const userRouter = require('./routes/users');

if (process.env.NODE_ENV === 'test')
  mongoose.connect(process.env.DB_SERVER);

if (process.env.NODE_ENV !== 'test')
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/golf4friends-dev');

let db = mongoose.connection;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/courses', courseRouter);
app.use('/games', gameRouter);
app.use('/users', userRouter);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
