'use strict';

module.exports = function(app) {
  app.service('ChartService', ['$rootScope', '$http', 'GameService', function($rs, $http, GameService) {
    this.gameData = GameService.gameData;
  }]);
};
