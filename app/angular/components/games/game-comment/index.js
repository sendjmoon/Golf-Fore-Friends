'use strict';

module.exports = function(app) {
  app.component('comment', {
    template: require('./game-comment-template.html'),
    controller: 'CommentController',
    controllerAs: 'cc',
    bindings: {
      gameId: '<',
      comments: '<',
    },
  });
};
