'use strict';

const angular = require('angular');

require('angular-middleware');
require('./scss/base.scss');

const golfApp = angular.module('golfApp', ['ngRoute', 'ngRoute.middleware']);
const __API_URL__ = process.env.API_URL || 'http://localhost:3000';

require('./services')(golfApp);
require('./controllers')(golfApp);
require('./components')(golfApp);

golfApp.run(['$rootScope', ($rs) => {
  $rs.baseUrl = `${__API_URL__}`;
  $rs.userConfig = {
    Headers: {
      'Content-Type': 'application/json',
      'Accept-Content': 'application/json',
    },
  };
}]);

golfApp.config(require('./routes/route_config'));
golfApp.config(require('./lib/check_session_exists'));
