'use strict';

module.exports = function(app) {
  app.component('snGames', {
    template: require('./sub-nav-games-template.html'),
    controller: 'SubNavController',
    controllerAs: 'snc',
    bindings: {
      creatingGame: '=',
    },
  });
};
