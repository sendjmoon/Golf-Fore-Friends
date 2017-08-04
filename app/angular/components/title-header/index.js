'use strict';

module.exports = function(app) {
  app.component('titleHeader', {
    template: require('./title-header-template.html'),
  });
};
