'use strict';

module.exports = function(app) {
  app.service('GameService', ['$rootScope', '$http', function($rs, $http) {

    this.getById = function(gameId) {
      let gameData = {
        _id: gameId,
      };
      $http.post($rs.baseUrl + '/games', gameData)
        .then((game) => {
          console.log(game);
        })
        .catch((err) => {
          alert('error getting game by id');
        });
    };
  }]);
};
