'use strict';

module.exports = function(app) {
  app.controller('SubNavController', ['$rootScope', function($rs) {
    const ctrl = this;

    ctrl.scrollToAnchor = function(anchorId, href) {
      anchorId = `#${anchorId}`;
      $('html, body').animate({ scrollTop: $(anchorId).offset().top }, 500);
    }

    ctrl.subNavClickHandler = function() {
      $('.sub-nav-link').on('click', function(e) {
        ctrl.scrollToAnchor($(this).attr('scroll-target'), $(this).attr('href'));
      });
    }

    ctrl.init = function() {
      ctrl.subNavClickHandler();
    }

    ctrl.init();
  }]);
};
