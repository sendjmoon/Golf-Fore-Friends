'use strict';

module.exports = function(app) {
  app.component('signin', {
    template: require('./signin-template.html'),
    controller: 'AuthController',
  });
};
