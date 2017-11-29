'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  stats: {
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
  },
  gameIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Game',
    unique: true,
  }],
  friendIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Friend',
    unique: true,
  }],
},
{
  collection: 'users',
});

UserSchema.index({ email: -1, gameIds: -1, friendIds: -1 }, { unique: true });

module.exports = mongoose.model('User', UserSchema);
