'use strict';

module.exports = function(app) {
  //TODO: rename to GameController
  app.controller('GamesController', ['$route', '$scope', 'GameService', 'UserService', function($route, $scope, gameService, userService) {

    const ctrl = this;
    ctrl.user = userService.data.user;
    $scope.gameService = gameService;
    $scope.gamesData = gameService.data.allGames;
    ctrl.creating = false;

    ctrl.init = function() {
      gameService.getAllById(ctrl.user.gameIds);
    };

    ctrl.init();

  }]);
};
