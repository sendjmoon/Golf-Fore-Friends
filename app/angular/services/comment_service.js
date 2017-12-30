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

    return {
      create: create,
    };
  }]);
};
