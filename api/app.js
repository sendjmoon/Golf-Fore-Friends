'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const redis = require('redis');
const redisClient = redis.createClient();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const logger = require('morgan');
const errorHandler = require('./lib/error_handler');

const coursesRouter = require('./routes/courses');
const gamesRouter = require('./routes/games');
const usersRouter = require('./routes/users');

if (process.env.NODE_ENV === 'test')
  mongoose.connect(process.env.DB_SERVER);

if (process.env.NODE_ENV !== 'test')
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/golf4friends-dev');

const app = express();

const sessionOptions = {
  secret: '1337',
  store: new RedisStore({
    client: redisClient,
  }),
  name: 'GolfFourFriends',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 86400 * 365
  },
};

if (app.get('env') === 'production')
  sessionOptions.cookie.secure = true;

app.use(session(sessionOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/courses', coursesRouter);
app.use('/games', gamesRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
