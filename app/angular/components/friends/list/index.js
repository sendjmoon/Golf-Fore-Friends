'use strict';

module.exports = function(app) {
  app.component('friendsList', {
    template: require('./friends-list-template.html'),
    controller: 'UserController',
    controllerAs: 'uc',
    bindings: {
      baseUrl: '<',
    },
  });
};
