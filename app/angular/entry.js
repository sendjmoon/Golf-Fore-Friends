'use strict';

// require('!!file-loader?name=[name].[ext]!./html/index.html');
// require('./less/base.less');

const angular = require('angular');

const golfApp = angular.module('golfApp', [require('angular-route')]);

require('./controllers')(golfApp);
require('./components')(golfApp);

golfApp.run(['$rootScope', ($rs) => {
  $rs.baseUrl = 'http://localhost:3000';
  $rs.userConfig = {
    Headers: {
      'Content-Type': 'application/json',
      'Accept-Content': 'application/json',
    },
  };
}]);

golfApp.config(require('./routes/route_config'));
