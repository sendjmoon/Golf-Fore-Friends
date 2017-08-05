'use strict';

module.exports = function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/dashboard', {
      template: require('../html/dashboard.html'),
    })
    .when('/signup', {
      template: require('../html/signup.html'),
    })
    .when('/signin', {
      template: require('../html/signin.html'),
    })
    .otherwise({
      redirectTo: '/signup',
    });
};
