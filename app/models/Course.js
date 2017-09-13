'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let scorecardTemplate = require('./templates/scorecard_template');

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
  scorecard: scorecardTemplate,
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
