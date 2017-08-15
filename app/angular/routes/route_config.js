'use strict';

module.exports = function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/dashboard', {
      template: require('../html/dashboard.html'),
    })
    .when('/friends', {
      template: require('../html/friends.html'),
    })
    .when('/', {
      template: require('../html/landing.html'),
    })
    .otherwise({
      redirectTo: '/',
    });
};
