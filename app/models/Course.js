'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
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
  games : {
    type: Array,
    required: false,
    unique: false,
  },
},
{
  collection: 'courses',
});

module.exports = mongoose.model('Course', CourseSchema);
