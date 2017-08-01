'use strict';

module.exports = function(app) {
  app.component('addFriend', {
    template: require('./add-friend-template.html'),
    controller: 'FriendController',
    controllerAs: 'fc',
    bindings: {
      baseUrl: '<',
    },
  });
};
