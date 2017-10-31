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
  handicap: {
    type: Number,
    default: 0,
    required: false,
    unique: false,
  },
  gameIds: [{
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      unique: false,
    },
    publicId: {
      type: String,
      required: true,
      unique: false,
    },
    strokes: {
      type: Number,
      required: true,
      unique: false,
    },
  }],
  friendIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: false,
  }],
},
{
  collection: 'users',
});

module.exports = mongoose.model('User', UserSchema);
