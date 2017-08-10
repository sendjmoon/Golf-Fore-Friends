'use strict';

module.exports = function(app) {
  app.component('gamesWidget', {
    template: require('./games-widget-template.html'),
    controller: 'DashboardController',
    controllerAs: 'dc',
  });
};
