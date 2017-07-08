'use strict';

module.exports = function(app) {
  app.component('register', {
    template: require('./register-template.html'),
    controller: 'AuthController',
    bindings: {
      baseUrl: '<',
    },
  });
};
