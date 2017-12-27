'use strict';

const Promise = require('bluebird');
const utils = require('../utils');

module.exports = function(commentDao) {
  const _commentDao = commentDao;

  const create = function(gameId, authorId, authorName, content) {
    return new Promise((resolve, reject) => {
      const commentData = {
        publicId: `${utils.generateHash(4)}-${authorName.toLowerCase().split(' ').join('')}`,
        gameId: gameId,
        authorId: authorId,
        authorName: authorName,
        content: content,
      };
      _commentDao.create(commentData)
        .then((newComment) => {
          resolve(newComment);
        })
        .catch(reject);
    });
  };

  return {
    create: create,
  }
}
