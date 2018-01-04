'use strict';

module.exports = function(app) {
  app.controller('AuthController', ['$rootScope', 'AuthService', function($rs, authService) {

    const ctrl = this;

    ctrl.signup = function(userData) {
      authService.signup(userData)
        .catch(() => {
          console.log('Error signing up.');
        });
    }

    this.signin = authService.signin;
    this.signout = authService.signout;
  }]);
};
