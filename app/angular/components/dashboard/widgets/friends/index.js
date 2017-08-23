'use strict';

module.exports = function(app) {
  app.component('friendsWidget', {
    template: require('./friends-widget-template.html'),
    // controller: 'DashboardController',
    // controllerAs: 'dc',
  });
};
