'use strict';

module.exports = function($routeProvider) {
  $routeProvider
    .when('/home', {
      template: require('../html/home.html'),
    })
    .when('/signup', {
      template: require('../html/signup.html'),
    })
    .otherwise({
      redirectTo: '/home',
    });
};
