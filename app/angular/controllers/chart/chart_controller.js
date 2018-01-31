'use strict';

module.exports = function(app) {
  app.controller('ChartController', ['$rootScope', '$scope', 'ChartService', 'GameService', 'ResultService', 'UserService', function($rs, $scope, chartService, gameService, resultService, userService) {

    let ctrl = this;
    ctrl.user = userService.data.user;
    ctrl.gameData;
    ctrl.games = [];
    let strokeData = [];
    let dateData = [];
    $scope.gamesData = gameService.data.allGames;

    ctrl.parseStrokeData = function(array) {
      array.forEach()
    };

    ctrl.loadChart = function() {
      let Chart = require('chart.js');
      let gameCtx = document.getElementById('gameChart').getContext('2d');
      // let winCtx = document.getElementById('winChart').getContext('2d');
      let chartjsPluginAnnotation = require('chartjs-plugin-annotation');
      let gameChartConfig = require('./game_chart_config');
      // let winChartConfig = require('./win_chart_config');
      let userHandicap = ctrl.user.stats.handicap;

      let gameChartData = {
        labels: dateData,
        datasets: [{
          label: 'Strokes',
          data: strokeData,
          }],
      };

      let winChartData = {
        labels: ['Wins', 'Losses'],
        datasets: [{
          data: [2, 3],
          backgroundColor: ['#89c97a', '#ddd'],
        }],
      };

      Chart.pluginService.register(chartjsPluginAnnotation);
      let gameChart = new Chart(gameCtx, gameChartConfig(gameChartData, userHandicap));
      let winChart = new Chart(winCtx, winChartConfig(winChartData));
    };

    ctrl.init = function() {
      resultService.getAllByUserId(ctrl.user._id)
        .then((results) => {
          console.log(results);
        });
    };

    ctrl.init();
  }]);
};
