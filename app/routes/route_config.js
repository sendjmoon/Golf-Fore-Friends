'use strict';

module.exports = function($routeProvider) {
  $routeProvider
    .when('/home', {
      template: require('../html/home.html'),
      controller: 'HomeController',
    })
    .otherwise({
      redirectTo: '/',
    });
};
