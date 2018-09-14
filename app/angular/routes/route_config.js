'use strict';

module.exports = function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/dashboard', {
      template: require('../html/dashboard.html'),
      middleware: 'checkSessionExists',
    })
    .when('/friends', {
      template: require('../html/friends.html'),
      middleware: 'checkSessionExists',
    })
    .when('/games', {
      template: require('../html/games/list.html'),
      middleware: 'checkSessionExists',
    })
    .when('/games/create', {
      template: require('../html/games/create.html'),
      middleware: 'checkSessionExists',
    })
    .when('/games/public/:publicId', {
      template: require('../html/games/view.html'),
      middleware: 'checkSessionExists',
      controller: 'GamesController',
      controllerAs: 'gc',
    })
    .when('/settings', {
      template: require('../html/settings.html'),
      middleware: 'checkSessionExists',
      controller: 'SettingsController',
      controllerAs: 'sc',
    })
    .when('/', {
      template: require('../html/landing.html'),
      controller: 'LandingController',
      controllerAs: 'lc',
    })
    .otherwise({
      redirectTo: '/',
    });
};
