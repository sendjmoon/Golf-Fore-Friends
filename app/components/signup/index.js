'use strict';

module.exports = function(app) {
  app.component('signup', {
    template: require('./signup-template.html'),
    controller: 'AuthController',
    bindings: {
      baseUrl: '<',
    },
  });
};
