'use strict';

module.exports = function(app) {
  app.controller('NavController', ['$rootScope', 'AuthService', function($rs, AuthService) {
    this.signout = AuthService.signout;
    let hamMenu = document.getElementById('hamburger-menu-icon');

    let toggleMenu = function(el) {
      let navMenu = document.getElementById('nav-menu');
      el.classList.toggle('open');
      navMenu.classList.toggle('open');
    };

    hamMenu.addEventListener('click', () => {
      toggleMenu(hamMenu);
    });
  }]);
};
