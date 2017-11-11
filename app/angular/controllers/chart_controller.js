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
          results[gameArray.length - index - 1] = game.playedOn;
        });
        dateData = results;
        resolve(results);
      });
    };

    this.loadChart = function() {
      let Chart = require('chart.js');
      let ctx = document.getElementById('gameChart').getContext('2d');
      let chartjsPluginAnnotation = require('chartjs-plugin-annotation');
      Chart.pluginService.register(chartjsPluginAnnotation);

      let userHandicap = JSON.parse(window.sessionStorage.getItem('currentUser')).handicap;
      let chartData = {
        labels: dateData,
        datasets: [
          {
            label: 'Strokes',
            backgroundColor: 'rgba(77, 187, 51, 0.2)',
            borderColor: 'rgba(77, 187, 51, 1)',
            borderWidth: 2,
            data: strokeData,
          },
        ],
      };

      let gameChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          legend: {
            position: 'bottom',
          },
          elements: {
            line: {
              tension: 0.1,
            },
          },
          annotation: {
            drawTime: 'afterDatasetsDraw',
            annotations: [{
              drawTime: 'afterDatasetsDraw',
              id: 'h-line-1',
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: userHandicap,
              borderColor: 'rgba(254, 172, 0, 0.6)',
              borderWidth: 5,
              label: {
                backgroundColor: 'rgba(254, 172, 0, 1)',
                position: 'center',
                enabled: true,
                content: 'Handicap',
              },
            }],
          },
        },
      });
    };

  }]);
};
