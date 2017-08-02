'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$rootScope', 'AuthService', function($rs, AuthService) {
    this.signup = AuthService.signup;
    this.signin = AuthService.signin;
    this.signout = AuthService.signout;
  }]);
};
