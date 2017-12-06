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
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  stats: {
    type: Schema.Types.ObjectId,
    ref: 'UserStats',
  },
  gameIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Game',
  }],
  friendIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Friend',
  }],
},
{
  collection: 'users',
});

module.exports = mongoose.model('User', UserSchema);
