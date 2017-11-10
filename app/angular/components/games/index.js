'use strict';

module.exports = function(app) {
  app.component('games', {
    template: require('./games-template.html'),
    controller: 'GamesController',
    controllerAs: 'gc',
  });

  require('./new-game')(app);
  require('./game-chart')(app);
};
