'use strict';

module.exports = function(app) {
  app.service('CreateGameService', ['$rootScope', function($rs) {
    
    const players = [];

    return {
      players: players,
    };
  }]);
};
