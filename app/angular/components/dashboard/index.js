'use strict';

module.exports = function(app) {
  app.component('dashboard', {
    template: require('./dashboard-template.html'),
    controller: 'DashboardController',
    controllerAs: 'dc',
  });
};
