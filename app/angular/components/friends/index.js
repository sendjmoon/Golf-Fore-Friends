'use strict';

module.exports = function(app) {
  app.component('friends', {
    template: require('./friends-template.html'),
    controller: 'FriendController',
    controllerAs: 'fc',
  });
};
