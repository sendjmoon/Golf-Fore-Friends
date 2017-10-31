'use strict';

module.exports = function(app) {
  app.service('GameService', ['$rootScope', '$http', function($rs, $http) {

    this.getById = function(gameId) {
      $http.get($rs.baseUrl + '/games/' + gameId)
        .then((game) => {
          $rs.gameData = game.data;
          console.log(game);
        })
        .catch((err) => {
          alert('error getting game by id');
        });
    };
  }]);
};
