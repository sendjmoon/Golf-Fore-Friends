'use strict';

module.exports = function(app) {
  app.controller('CommentController', ['$rootScope', '$scope', 'CommentService', 'GameService', 'UserService', function($rs, $scope, commentService, gameService, userService) {

    let ctrl = this;
    ctrl.user = userService.data.user;
    ctrl.allComments = [];

    ctrl.create = function(gameId, content) {
      commentService.create(gameId, ctrl.user._id, ctrl.user.fullName, content)
        .then((newComment) => {
          let updateOptions = {
            $addToSet: { comments: newComment._id },
          };
          ctrl.allComments.push(newComment);
          gameService.updateById(gameId, updateOptions)
            .catch(() => {
              console.log('Error updating game.');
            });
          userService.updateByEmailOrUsername(ctrl.user.email, updateOptions)
            .catch(() => {
              console.log('Error updating user.');
            });
        })
        .catch((err) => {
          console.log('Error posting comment.');
        });
    };

    ctrl.parseComments = function(comments) {
      ctrl.comments.forEach((comment) => {
        ctrl.allComments.push(comment);
      });
    };
  }]);
};
