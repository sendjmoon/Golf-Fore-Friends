'use strict';
const CourseDaoMongoDbImpl = require('../daos/CourseDaoMongoDbImpl');

const CourseServiceImpl = require('./CourseServiceImpl');
const courseServiceImpl = CourseServiceImpl(CourseDaoMongoDbImpl());

module.exports = {
  courseService: courseServiceImpl,
};
