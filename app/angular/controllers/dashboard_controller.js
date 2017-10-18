'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'AuthService', 'UserService', function($rs, $location, $http, AuthService, UserService) {

    this.user = $rs.user;

    AuthService.checkSessionExists();
    UserService.calcHandicap();
  }]);
};
