'use strict';

module.exports = function(app) {
  app.controller('SettingsController', ['$rootScope', function($rs) {
    this.user = $rs.user;
  }]);
}
