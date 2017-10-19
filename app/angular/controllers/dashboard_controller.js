'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'AuthService', 'UserService', function($rs, $location, $http, AuthService, UserService) {

    AuthService.checkSessionExists();
    $rs.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
    this.user = $rs.user;

    UserService.updateHandicap(this.user)
      .catch((err) => {
        console.log('error updating handicap');
      });
  }]);
};
