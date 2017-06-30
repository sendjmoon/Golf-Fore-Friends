'use strict';

module.exports = function($routeProvider) {
  $routeProvider
    .when('/home', {
      template: require('../html/home.html'),
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
