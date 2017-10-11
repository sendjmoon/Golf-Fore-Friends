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
  gameIds: [{
    // type: Array,
    // unique: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    unique: true,
  }],
  friendIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  }],
},
{
  collection: 'users',
});

module.exports = mongoose.model('User', UserSchema);
