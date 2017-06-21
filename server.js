'use strict';

const express = require('express');
const logger = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));

app.listen(PORT, () => { console.log('Server up on ' + PORT ); });
