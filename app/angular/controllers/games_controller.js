'use strict';

module.exports = function(app) {
  //TODO: rename to GameController
  app.controller('GamesController', ['$route', '$scope', 'GameService', 'UserService', function($route, $scope, gameService, userService) {

    const ctrl = this;
    $scope.gameService = gameService;
    $scope.gamesData = gameService.data.allGames;
    ctrl.user = userService.data.user;
    ctrl.creating = false;

    ctrl.getGamesData = function() {
      gameService.getAllById(ctrl.user.gameIds)
        .catch((err) => {
          console.log('Error getting games.');
        });
    };

    ctrl.reloadPage = function() {
      $route.reload();
    }

    ctrl.init = function() {
      ctrl.getGamesData();
    };

    ctrl.init();

  }]);
};
