'use strict';

module.exports = function(app) {
  app.controller('LandingController', ['$rootScope', function($rs) {
    this.baseUrl = $rs.baseUrl;
  }]);
};
