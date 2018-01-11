'use strict';

module.exports = function(app) {
  app.component('banner', {
    template: require('./banner-template.html'),
    // controller: 'BannerController',
    // controllerAs: 'bc',
  });
};
