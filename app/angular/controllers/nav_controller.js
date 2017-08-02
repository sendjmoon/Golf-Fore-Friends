'use strict';

module.exports = function(app) {
  app.controller('NavController', ['$rootScope', 'AuthService', function($rs, AuthService) {
    this.signout = AuthService.signout;
  }]);
};
