'use strict';

module.exports = function(app) {
  app.component('friendsList', {
    template: require('./friends-list-template.html'),
    controller: 'FriendController',
    controllerAs: 'fc',
    bindings: {
      baseUrl: '<',
    },
  });
};
