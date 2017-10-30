'use strict';

module.exports = function(app) {
  app.service('GameService', ['$rootScope', '$http', function($rs, $http) {

    this.getById = function(gameId) {
      $http.get($rs.baseUrl + '/games/' + gameId)
        .then((game) => {
          console.log(game);
        })
        .catch((err) => {
          alert('error getting game by id');
        });
    };
  }]);
};
