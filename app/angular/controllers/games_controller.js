'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$scope', 'UserService', 'FriendService', 'GameService', 'SearchService', function($scope, UserService, FriendService, GameService, SearchService) {

    let ctrl = this;
    ctrl.user = UserService.data.user;
    ctrl.creating = false;

    ctrl.initCreate = function() {
      ctrl.creating = true;
    }
    
  }]);
};
