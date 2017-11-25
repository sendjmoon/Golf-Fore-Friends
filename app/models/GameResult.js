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
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
  strokes: {
    type: Number,
    required: true,
  },
});

GameResultSchema.index({ gameId: -1 });
GameResultSchema.index({ playerId: -1, gameId: 1}, { unique: true });

module.exports = mongoose.model('GameResult', GameResultSchema);
