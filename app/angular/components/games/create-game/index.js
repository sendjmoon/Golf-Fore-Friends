'use strict';

module.exports = function(app) {
  app.component('createGame', {
    template: require('./create-game-template.html'),
    controller: 'CreateGameController',
    controllerAs: 'cgc',
    bindings: {
      creating: '=',
    },
  });
};
