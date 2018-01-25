'use strict';

module.exports = function(app) {
  app.component('subNav', {
    template: require('./sub-nav-template.html'),
    controller: 'SubNavController',
    controllerAs: 'snc',
    bindings: {
      pageTitle: '<',
    },
  });
};
