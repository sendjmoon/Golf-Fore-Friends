'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const url = require('url');

const redis = require('redis');
// const redisClient = redis.createClient();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const logger = require('morgan');
const errorHandler = require('./lib/error_handler');

const index = require('./routes/index');
const commentsRouter = require('./routes/comments');
const coursesRouter = require('./routes/courses');
const gamesRouter = require('./routes/games');
const gameResultRouter = require('./routes/game_result');
const usersRouter = require('./routes/users');
const userStatsRouter = require('./routes/user_stats');
const friendsRouter = require('./routes/friends');

mongoose.Promise = require('bluebird');

const mongoDbOptions = {
  useMongoClient: true,
}

if (process.env.NODE_ENV === 'test')
  mongoose.connect(process.env.DB_SERVER, mongoDbOptions);

if (process.env.NODE_ENV !== 'test')
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gff-dev', mongoDbOptions);

if (process.env.REDISTOGO_URL) {
  var redisUrl = url.parse(process.env.REDISTOGO_URL);
  var redisClient = redis.createClient(redisUrl.port, redisUrl.hostname);

  redisClient.auth(redisUrl.auth.split(':')[1]);
} else {
  var redisClient = redis.createClient();
}

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const sessionOptions = {
  secret: '1337',
  store: new RedisStore({
    client: redisClient,
  }),
  name: 'GolfForeFriends',
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 86400 * 365,
  },
};

if (process.env.NODE_ENV === 'production') {
  sessionOptions.cookie.secure = true;
  sessionOptions.resave = false;
  sessionOptions.saveUninitialized = false;
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(cors());

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/courses', coursesRouter);
app.use('/games', gamesRouter);
app.use('/games/result', gameResultRouter);
app.use('/games/comments', commentsRouter);
app.use('/users', usersRouter);
app.use('/users/stats', userStatsRouter);
app.use('/friends', friendsRouter);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
