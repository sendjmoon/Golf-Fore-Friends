'use strict';

module.exports = function(app) {
  app.component('createGame', {
    template: require('./create-game-template.html'),
    controller: 'GamesController',
    controllerAs: 'gc',
    bindings: {
      friendsList: '=',
    },
  });
};
