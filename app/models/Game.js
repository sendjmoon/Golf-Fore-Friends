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
  // course: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Course',
  // },
  createdAt: {
    type: Number,
    unique: false,
  },
  updatedAt: {
    type: Number,
    unique: false,
  },
  players: [{
    player: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    score: {
      type: Number,
      required: true,
      unique: false,
    },
  }],
},
{
  collection: 'games',
});

module.exports = mongoose.model('Game', GameSchema);
