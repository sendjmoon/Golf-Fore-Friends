'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  course: {
    type: String,
    required: true,
    unique: false,
  },
  createdAt: {
    type: Number,
    unique: false,
  },
},
{
  collection: 'games',
});

module.exports = mongoose.model('Game', GameSchema);
