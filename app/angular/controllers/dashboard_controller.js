'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', function($rs, $location) {
    $rs.user === undefined ? $location.path('/') : this.user = $rs.user;
    this.user._id === undefined ? $location.path('/') : true;
  }]);
};
