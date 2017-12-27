'use strict';

const Promise = require('bluebird');
const Comment = require('../models/Comment');

module.exports = function() {
  const create = function(commentData) {
    return new Promise((resolve, reject) => {
      const comment = new Comment(commentData);
      comment.createdAt = Date.now();
      comment.updatedAt = Date.now();
      comment.save()
        .then((createdComment) => {
          Comment.findById(createdComment.id)
            .select('-__v')
            .exec()
              .then((newComment) => {
                resolve(newComment.toObject());
              })
              .catch((err) => {
                console.log(err);
                reject();
              });
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };

  return {
    create: create,
  };
};
