'use strict';

module.exports = function(app) {
  app.controller('AuthController', [function() {
    console.log('auth controller');

    this.signup = function() {
      console.log('signup function');
    };
  }]);
};
