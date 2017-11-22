'use strict';

module.exports = function(app) {
  app.controller('ChartController', ['$rootScope', 'GameService', 'ChartService', function($rs, GameService, ChartService) {

    this.gameData;
    this.games = [];
    let nameData, strokeData, dateData = [];

    // this.getGameData = function() {
    //   ChartService.getGameData()
    //     .then((gameData) => {
    //       this.gameData = gameData;
    //       console.log(gameData);
    //     })
    //     .catch(() => {
    //       console.log('Chart Controller Error: Error getting game data.');
    //     });
    // };

    this.getAllFromLocalStorage = function() {
      GameService.getAllFromLocalStorage()
        .then((gameData) => {
          this.sortAllData(gameData)
            .then(this.loadChart());
        })
        .catch(() => {
          console.log('error getting data');
        });
    };

    this.sortAllData = function(gameArray) {
      return new Promise((resolve, reject) => {
        this.sortStrokeData(gameArray)
          .then(this.sortDateData(gameArray))
              .then(resolve)
                .catch(reject);
      });
    };

    this.sortStrokeData = function(gameArray) {
      return new Promise((resolve, reject) => {
        if (!gameArray.length) reject;
        let results = [];
        gameArray.forEach((game, index) => {
          results[gameArray.length - index - 1] = game.yourStrokes;
        });
        strokeData = results;
        resolve(results);
      });
    };

    this.sortDateData = function(gameArray) {
      return new Promise((resolve, reject) => {
        if (!gameArray.length) reject;
        let results = [];
        gameArray.forEach((game, index) => {
          results[gameArray.length - index - 1] = game.playedOn.substr(0, game.playedOn.length - 5);
        });
        dateData = results;
        resolve(results);
      });
    };

    this.loadChart = function() {
      let Chart = require('chart.js');
      let gameCtx = document.getElementById('gameChart').getContext('2d');
      let winCtx = document.getElementById('winChart').getContext('2d');
      let chartjsPluginAnnotation = require('chartjs-plugin-annotation');
      let gameChartConfig = require('./game_chart_config');
      let winChartConfig = require('./win_chart_config');
      let userHandicap = JSON.parse(window.sessionStorage.getItem('currentUser')).handicap;

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
          data: [20, 30],
        }],
      };

      Chart.pluginService.register(chartjsPluginAnnotation);
      let gameChart = new Chart(gameCtx, gameChartConfig(gameChartData, userHandicap));
      let winChart = new Chart(winCtx, winChartConfig(winChartData));
    };
  }]);
};
