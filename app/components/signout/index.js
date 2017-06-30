'use strict';

module.exports = function(app) {
  app.component('signout', {
    template: require('./signout-template.html'),
    controller: 'AuthController',
    bindings: {
      baseUrl: '<',
    },
  })
}
