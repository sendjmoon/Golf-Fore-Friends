'use strict';

module.exports = function(app) {
  app.component('settings', {
    template: require('./settings-template.html'),
    controller: 'SettingsController',
    controllerAs: 'sc',
  });
};
