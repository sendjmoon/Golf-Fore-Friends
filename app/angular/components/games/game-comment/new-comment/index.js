'use strict';

module.exports = function(app) {
  app.component('newComment', {
    template: require('./new-comment-template.html'),
    controller: 'CommentController',
    controllerAs: 'cc',
    bindings: {
      gameId: '<',
    },
  });
};
