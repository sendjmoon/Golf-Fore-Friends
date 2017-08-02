'use strict';

module.exports = function(app) {
  app.controller('NavController', ['$location', function($location) {
    console.log('nav controller');
  }]);
};
