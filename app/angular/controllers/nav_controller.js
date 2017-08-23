'use strict';

module.exports = function(app) {
  app.controller('NavController', ['$rootScope', 'AuthService', function($rs, AuthService) {
    this.signout = AuthService.signout;

    let $hamMenu = $('#hamburger-menu-icon');
    let $navMenu = $('#nav-menu');

    this.toggleMenu = function($el) {
      $el.toggleClass('open');
      $navMenu.toggleClass('open');
    };

    $hamMenu.on('click', () => {
      this.toggleMenu($hamMenu);
    });
  }]);
};
