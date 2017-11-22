'use strict';

module.exports = function(app) {
  app.component('gameChart', {
    template: require('./game-chart-template.html'),
    controller: 'ChartController',
    controllerAs: 'cc',
    bindings: {
      chartType: '<',
    },
  });
};
