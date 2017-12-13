'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$route', function($route) {

    let ctrl = this;
    ctrl.creating = false;

    ctrl.reloadPage = function() {
      $route.reload();
    }

  }]);
};
