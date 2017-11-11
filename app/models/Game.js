'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  publicId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  location: {
    type: String,
    required: true,
    unique: false,
  },
  // course: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Course',
  // },
  updatedAt: {
    type: Number,
    unique: false,
  },
  createdAt: {
    type: Number,
    unique: false,
  },
  playedOn: {
    type: String,
    unique: false,
  },
  players: [{
    email: {
      type: String,
      required: true,
      unique: false,
    },
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: false,
    },
    strokes: {
      type: Number,
      required: true,
      unique: false,
    },
  }],
},
{
  collection: 'games',
});

GameSchema.index({ playedOn: -1 });

module.exports = mongoose.model('Game', GameSchema);
