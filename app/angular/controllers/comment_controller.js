'use strict';

module.exports = function(app) {
  app.controller('CommentController', ['$rootScope', '$scope', 'CommentService', function($rs, $scope, commentService) {

    let ctrl = this;

    ctrl.create = function(commentData) {
      commentService.create(
        commentData.gameId,
        commentData.authorId,
        commentData.authorName,
        commentData.content
      )
        .then((res) => {
          console.log('woohoo');
          console.log(res);
        })
        .catch((err) => {
          console.log('damn');
        });
    };
  }]);
};
