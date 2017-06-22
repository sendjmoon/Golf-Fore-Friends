'use strict';
const Promise = require('bluebird');

module.exports = function(courseDao) {
  const _courseDao = courseDao;

  const create = function(name) {
    const course = {};
    course.name = name;
    return _courseDao.create(course);
  };

  return {
    create: create,
  };
};
