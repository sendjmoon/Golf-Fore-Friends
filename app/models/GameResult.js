'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameResultSchema = new Schema({
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  playerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  result: {
    type: String,
    required: true,
    default: 'loss',
  },
  datePlayed: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  strokes: {
    type: Number,
    required: true,
  },
});

GameResultSchema.index({ createdAt: 1 });
GameResultSchema.index({ datePlayed: -1 });
GameResultSchema.index({ strokes: -1 });
GameResultSchema.index({ playerId: -1, gameId: 1 }, { unique: true });

module.exports = mongoose.model('GameResult', GameResultSchema);
