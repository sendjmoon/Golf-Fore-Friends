'use strict';
const Promise = require('bluebird');
const Course = require('../models/Course');

module.exports = function() {
  const create = function(courseData) {
    return new Promise((resolve, reject) => {
      const course = new Course(courseData);
      course.createdAt = Date.now();
      course.updatedAt = Date.now();
      course.save()
        .then((createdCourse) => {
          Course.findById(createdCourse.id)
            .select('-__v')
            .exec()
            .then((newCourse) => {
              resolve(newCourse.toObject());
            })
            .catch(reject);
        })
        .catch(reject);
    });
  };

  return {
    create: create,
  };
};
