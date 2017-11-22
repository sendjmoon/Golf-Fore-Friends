'use strict';

module.exports = function(app) {
  app.component('navBar', {
    template: require('./nav-template.html'),
    controller: 'NavController',
    controllerAs: 'nc',
    bindings: {
      pageTitle: '<',
    },
  });
};
