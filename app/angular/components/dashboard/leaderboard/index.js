'use strict';

module.exports = function(app) {
  app.component('leaderboard', {
    template: require('./leaderboard-template.html'),
    controller: 'LeaderboardController',
    controllerAs: 'lc',
    bindings: {
      leaderboard: '<',
    }
  });
}
