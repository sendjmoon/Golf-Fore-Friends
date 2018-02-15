'use strict';

module.exports = function(app) {
  app.component('player', {
    template: require('./player-template.html'),
    controller:'CreateGameController',
    controllerAs: 'cgc',
    bindings: {
      player: '<',
    },
  });
};
