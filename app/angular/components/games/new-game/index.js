'use strict';

module.exports = function(app) {
  app.component('newGame', {
    template: require('./new-game-template.html'),
    controller: 'GamesController',
    controllerAs: 'gc',
    bindings: {
      friendsList: '=',
    },
  });
};
