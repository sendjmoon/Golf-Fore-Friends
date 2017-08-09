'use strict';

module.exports = function(app) {
  app.component('auth', {
    template: require('./auth-template.html'),
    controller: 'AuthController',
    controllerAs: 'ac',
  });

  require('./forms')(app);
}
