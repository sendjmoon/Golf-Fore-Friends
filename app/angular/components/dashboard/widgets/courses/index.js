'use strict';

module.exports = function(app) {
  app.component('coursesWidget', {
    template: require('./courses-widget-template.html'),
    controller: 'DashboardController',
    controllerAs: 'dc',
  });
};
