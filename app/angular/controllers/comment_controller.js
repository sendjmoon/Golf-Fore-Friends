'use strict';

module.exports = function(app) {
  app.controller('CommentController', ['$rootScope', '$scope', 'CommentService', 'GameService', 'UserService', function($rs, $scope, commentService, gameService, userService) {

    let ctrl = this;
    ctrl.user = userService.data.user;

    ctrl.create = function(gameId, content) {
      commentService.create(gameId, ctrl.user._id, ctrl.user.fullName, content)
        .then((newComment) => {
          let updateOptions = {
            $addToSet: { comments: newComment._id },
          };
          gameService.updateById(gameId, updateOptions)
            .then(gameService.getAllById(ctrl.user.gameIds))
            .catch((err) => {
              console.log('Error updating game.');
            });

          userService.updateByEmailOrUsername(ctrl.user.email, updateOptions)
            .catch((err) => {
              console.log('Error updating user.');
            });
        })
        .catch((err) => {
          console.log('Error posting comment.');
        });
    };

    ctrl.update = function(publicId, content) {
      commentService.updateByPublicId(publicId, content)
        .then(() => {
          gameService.getAllById(ctrl.user.gameIds);
          ctrl.editing = false;
        })
        .catch((err) => {
          console.log('Error updating comment.');
        });
    };

    ctrl.remove = function(commentId, gameId) {
      console.log('removing');
      let updateOptions = {
        $pull: { comments: commentId },
      };

      commentService.removeById(commentId)
        .catch((err) => {
          console.log('Error removing comment.');
        });

      gameService.updateById(gameId, updateOptions)
        .then(() => {
          gameService.getAllById(ctrl.user.gameIds);
        })
        .catch((err) => {
          console.log('Error updating game.');
        });

      userService.updateByEmailOrUsername(ctrl.user.email, updateOptions)
        .catch((err) => {
          console.log('Error updating user.');
        });
    };
  }]);
};
