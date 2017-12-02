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
  datePlayed: {
    type: Date,
    unique: false,
  },
  createdAt: {
    type: Date,
    unique: false,
  },
  updatedAt: {
    type: Date,
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

GameSchema.index({ datePlayed: -1 });

module.exports = mongoose.model('Game', GameSchema);
