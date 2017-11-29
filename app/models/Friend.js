'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  friendId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  statsAgainst: {
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
  },
});

FriendSchema.index({ friendId: -1 }, { unique: true });

module.exports = mongoose.model('Friend', FriendSchema);
