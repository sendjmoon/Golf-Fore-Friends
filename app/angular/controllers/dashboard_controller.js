'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'AuthService', 'UserService', function($rs, $location, $http, AuthService, UserService) {

    AuthService.checkSessionExists();
    this.user = $rs.user;
  }]);
};
