'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$http', function($rs) {
    console.log('games controller');

    this.createGame = function() {
      console.log('new game function');
    };
  }]);
}
