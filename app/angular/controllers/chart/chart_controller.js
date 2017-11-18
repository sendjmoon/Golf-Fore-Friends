'use strict';

module.exports = function(app) {
  app.controller('ChartController', ['$rootScope', 'GameService', function($rs, GameService) {

    this.games = [];
    let nameData, strokeData, dateData = [];

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
      let ctx = document.getElementById('gameChart').getContext('2d');
      let chartjsPluginAnnotation = require('chartjs-plugin-annotation');
      let chartConfig = require('./chart_config');

      let userHandicap = JSON.parse(window.sessionStorage.getItem('currentUser')).handicap;
      let chartData = {
        labels: dateData,
        datasets: [
          {
            label: 'Strokes',
            borderWidth: 3,
            data: strokeData,
          },
        ],
      };

      Chart.pluginService.register(chartjsPluginAnnotation);
      let gameChart = new Chart(ctx, chartConfig(chartData, userHandicap));
    };

  }]);
};
