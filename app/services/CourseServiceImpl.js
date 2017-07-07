'use strict';
const Promise = require('bluebird');

module.exports = function(courseDao) {
  const _courseDao = courseDao;

  const create = function(name, location, scorecard) {
    const courseData = {
      name: name,
      location: location,
      scorecard: scorecard,
    };
    
    return _courseDao.create(courseData);
  };

  return {
    create: create,
  };
};
