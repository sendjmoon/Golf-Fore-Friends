'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'AuthService', 'UserService', function($rs, $location, $http, AuthService, UserService) {

    AuthService.checkSessionExists();
    $rs.user = JSON.parse(window.sessionStorage.getItem('currentUser'));

    UserService.updateHandicap($rs.user)
      .then((res) => {
        console.log('updated handicap');
      })
      .catch((err) => {
        console.log('error updating handicap');
      });
  }]);
};
