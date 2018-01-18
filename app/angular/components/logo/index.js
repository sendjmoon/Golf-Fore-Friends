'use strict';

module.exports = function(app) {
  app.component('logo', {
    template: require('./logo-template.html'),
  });
};
