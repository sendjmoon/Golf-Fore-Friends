'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
      required: true,
      default: 0,
    },
    losses: {
      type: Number,
      required: true,
      default: 0,
    },
    ties: {
      type: Number,
      required: true,
      default: 0,
    }
  },
});

FriendSchema.index({ userId: -1 });
FriendSchema.index({ userId: 1, friendId: 1 }, { unique: true });

module.exports = mongoose.model('Friend', FriendSchema);
