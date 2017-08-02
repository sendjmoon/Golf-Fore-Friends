'use strict';

module.exports = function(app) {
  app.component('home', {
    template: require('./home-template.html'),
    controller: 'HomeController',
    controllerAs: 'hc',
  });
};
