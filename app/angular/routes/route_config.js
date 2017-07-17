'use strict';

module.exports = function($routeProvider, $locationProvider) {
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

  // $locationProvider.html5Mode({
  //   enabled: true,
  //   requireBase: false,
  // });
};
