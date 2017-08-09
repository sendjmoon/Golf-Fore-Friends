'use strict';

module.exports = function(app) {
  app.controller('DashboardController', [function() {
    $('.hamburger-menu-icon').on('click', function() {
      $(this).toggleClass('open');
    });
  }]);
};
