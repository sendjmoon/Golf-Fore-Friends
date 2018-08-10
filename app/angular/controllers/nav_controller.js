'use strict';

module.exports = function(app) {
  app.controller('NavController', ['$rootScope', 'AuthService', function($rs, AuthService) {

    let ctrl = this;
    ctrl.signout = AuthService.signout;
    ctrl.linkTitle = 'test';

    let $window = $(window);
    let $hamMenu = $('#hamburger-menu-icon');
    let $navBar = $('nav-bar');
    let $navMenu = $('#nav-menu');

    ctrl.toggleMenu = function($el) {
      $el.toggleClass('open');
      $navMenu.toggleClass('open');
    };

    ctrl.scrollListener = function() {
      let offsetStart = $navBar.offset().top;
      let offsetTop = 0;

      $window.on('scroll', () => {
        offsetTop = $navBar.offset().top;
        offsetTop = offsetStart - ((offsetTop - offsetStart) * 0.2);

        offsetTop < 0 ?
          offsetTop = 0 : offsetTop = offsetTop;

        offsetTop > offsetStart ?
          offsetTop = offsetStart : offsetTop = offsetTop;

        offsetTop === 0 ?
          $navBar.addClass('gff-full') : $navBar.removeClass('gff-full');

        $navBar.css('top', offsetTop + 'px');
      });
    };

    ctrl.menuListener = function() {
      $hamMenu.on('click', () => {
        ctrl.toggleMenu($hamMenu);
      });
    };

    ctrl.init = function() {
      // ctrl.scrollListener();
      ctrl.menuListener();
    };

    ctrl.init();
  }]);
};
