'use strict';

module.exports = function(app) {
  app.component('addFriend', {
    template: require('./add-friend-template.html'),
    controller: 'UserController',
    controllerAs: 'uc',
    bindings: {
      baseUrl: '<',
    },
  });
};
