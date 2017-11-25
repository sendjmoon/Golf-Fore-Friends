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
  updatedAt: {
    type: Number,
    unique: false,
  },
  createdAt: {
    type: Number,
    unique: false,
  },
  datePlayed: {
    type: String,
    unique: false,
  },
  results: [{
    type: Schema.Types.ObjectId,
    ref: 'GameResult',
    required: true,
  }],
},
{
  collection: 'games',
});

GameSchema.index({ playedOn: -1 });

module.exports = mongoose.model('Game', GameSchema);
