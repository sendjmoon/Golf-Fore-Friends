'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', function($rs) {
    console.log('dash controller');
    console.log($rs.user);
  }]);
};
