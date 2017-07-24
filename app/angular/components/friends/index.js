'use strict';

module.exports = function(app) {
  app.component('friends', {
    template: require('./friends-template.html'),
    controller: 'UserController',
    bindings: {
      baseUrl: '<',
    },
  });
};
