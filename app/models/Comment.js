'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  publicId: {
    type: String,
    required: true,
    unique: true,
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  authorId: {
    type: Schema.Type.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    requireD: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
},
{
  collection: 'comments',
});

CommentSchema.index({ publicId: 1 });

module.exports = mongoose.model('Comment', CommentSchema);
