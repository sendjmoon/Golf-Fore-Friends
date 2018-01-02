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

  const updateByPublicId = function(publicId, updateOptions) {
    return new Promise((resolve, reject) => {
      Comment.findOneAndUpdate({ publicId: publicId }, updateOptions)
        .then((res) => {
          res === null ? reject() : resolve();
        })
        .catch(reject);
    });
  };

  const removeById = function(commentId) {
    return new Promise((resolve, reject) => {
      Comment.findOneAndRemove({ _id: commentId })
        .then(resolve)
        .catch(reject);
    });
  };

  return {
    create: create,
    updateByPublicId: updateByPublicId,
    removeById: removeById,
  };
};
