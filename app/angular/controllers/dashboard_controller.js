'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', 'AuthService', function($rs, $location, AuthService) {

    AuthService.checkSessionExists();
    
  }]);
};
