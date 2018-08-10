'use strict';

module.exports = function(app) {
  app.controller('NavController', ['$rootScope', 'AuthService', function($rs, AuthService) {

    let ctrl = this;
    ctrl.signout = AuthService.signout;

    let $window = $(window);
    let $hamMenu = $('#hamburger-menu-icon');
    let $navBar = $('nav-bar');
    let $navMenu = $('#nav-menu');
    let $navLink = $('.nav-link');
    let $linkTitle = $('.link-title');

    ctrl.toggleMenu = function($el) {
      $el.toggleClass('open');
      $navMenu.toggleClass('open');
    }

    ctrl.menuListener = function() {
      $hamMenu.on('click', () => {
        ctrl.toggleMenu($hamMenu);
      });

      $navLink.on({
        mouseenter: function(e) {
          $linkTitle.html($(this).attr('data-title'));
        },
        mouseleave: function(e) {
          $linkTitle.html('');
        },
      });
    }

    ctrl.init = function() {
      ctrl.menuListener();
    }

    ctrl.init();
  }]);
};
