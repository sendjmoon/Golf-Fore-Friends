'use strict';
const Promise = require('bluebird');

module.exports = function(courseDao) {
  const _courseDao = courseDao;

  const create = function(name, location, scorecard) {
    const course = {};
    course.name = name;
    course.location = location;
    course.scorecard = JSON.parse(scorecard);
    return _courseDao.create(course);
  };

  return {
    create: create,
  };
};
