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
      let normalOffset = $navBar.offset().top;
      let offsetTop = 0;

      $window.on('scroll', () => {
        offsetTop = $navBar.offset().top;
        offsetTop = normalOffset - ((offsetTop - normalOffset) * 0.2);

        if (offsetTop < 0) offsetTop = 0;
        if (offsetTop > normalOffset) offsetTop = normalOffset;

        if (offsetTop === 0) {
          $gffNav.css('width', '100%');
          $navBar.css('height', '60px');
        }
        else {
          $gffNav.css('width', '97%');
          $navBar.css('height', '80px');
        }

        $navBar.css('top', offsetTop + 'px');
      });
    }

    $hamMenu.on('click', () => {
      this.toggleMenu($hamMenu);
    });

    this.backgroundParallax();
  }]);
};
