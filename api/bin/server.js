'use strict';

const express = require('express');
const logger = require('morgan');
const app = express();

const courseRouter = require('../routes/courses.js');

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));

app.use('/', courseRouter);

app.listen(PORT, () => { console.log('server up on ' + PORT ); });
