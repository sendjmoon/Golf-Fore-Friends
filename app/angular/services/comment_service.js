'use strict';

module.exports = function(app) {
  app.factory('CommentService', ['$rootScope', '$http', function($rs, $http) {

    const create = function(gameId, authorId, authorName, content) {
      return new Promise((resolve, reject) => {
        const commentData = {
          gameId: gameId,
          authorId: authorId,
          authorName: authorName,
          content: content,
        };
        $http.post(`${$rs.baseUrl}/games/comments/create`, commentData)
          .then((newComment) => {
            resolve(newComment.data);
          })
          .catch(reject);
      });
    };

    const updateByPublicId = function(publicId, content) {
      return new Promise((resolve, reject) => {
        const updateData = {
          publicId: publicId,
          updateOptions: { content: content },
        };
        $http.post(`${$rs.baseUrl}/games/comments/update`, updateData)
          .then(resolve)
          .catch(reject);
      });
    };

    const removeByPublicId = function(publicId) {
      return new Promise((resolve, reject) => {
        const removeData = {
          publicId: publicId,
        };
        $http.post(`${$rs.baseUrl}/games/comments/remove`, removeData)
          .then(resolve)
          .catch(reject);
      });
    };

    return {
      create: create,
      updateByPublicId: updateByPublicId,
      removeByPublicId: removeByPublicId,
    };
  }]);
};
