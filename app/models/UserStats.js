'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStatsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  handicap: {
    type: Number,
    default: 0,
    required: false,
    unique: false,
  },
  handicapActual: {
    type: Number,
    default: 0,
    required: false,
    unique: false,
  },
  wins: {
    type: Number,
    default: 0,
    required: true,
  },
  losses: {
    type: Number,
    default: 0,
    required: true,
  },
  ties: {
    type: Number,
    default: 0,
    required: true,
  },
  winRatio: {
    type: Number,
    default: 0,
    required: true,
  },
});

UserStatsSchema.index({ userId: -1 }, { unique: true });

module.exports = mongoose.model('UserStats', UserStatsSchema);
