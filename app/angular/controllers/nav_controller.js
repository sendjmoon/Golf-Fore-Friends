'use strict';

module.exports = function(app) {
  app.controller('NavController', ['$rootScope', 'AuthService', function($rs, AuthService) {
    this.signout = AuthService.signout;

    let $window = $(window);
    let $hamMenu = $('#hamburger-menu-icon');
    let $banner = $('.banner-container');
    let $navBar = $('nav-bar');
    let $gffNav = $('.gff-nav');
    let $navMenu = $('#nav-menu');

    this.toggleMenu = function($el) {
      $el.toggleClass('open');
      $navMenu.toggleClass('open');
    };

    this.backgroundParallax = function() {
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
    }

    $hamMenu.on('click', () => {
      this.toggleMenu($hamMenu);
    });

    this.backgroundParallax();
  }]);
};
