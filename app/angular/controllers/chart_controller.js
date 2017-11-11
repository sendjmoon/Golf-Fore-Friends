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
      let canvas = document.getElementById('gameChart')
      let ctx = canvas.getContext('2d');
      let userHandicap = JSON.parse(window.sessionStorage.getItem('currentUser')).handicap;

      let handicapLinePlugin = {
        afterDraw: function(chartInstance) {
          let yScale = chartInstance.scales['y-axis-0'];
          let canvas = chartInstance.chart;
          let ctx = canvas.ctx;
          let index;
          let line;
          let style;
          let yValue;

          if (chartInstance.options.horizontalLine) {
            for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
              line = chartInstance.options.horizontalLine[index];

              !line.style ? style = 'rgba(169, 169, 169, 0.6)' : style = line.style;
              line.y ? yValue = yScale.getPixelForValue(line.y) : yValue = 0;

              ctx.lineWidth = 4;

              if (yValue) {
                ctx.beginPath();
                ctx.moveTo(38, yValue);
                ctx.lineTo(canvas.width - 36, yValue);
                ctx.strokeStyle = style;
                ctx.stroke();
              }

              if (line.text) {
                ctx.fillStyle = style;
                ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
              }
            }
            return;
          }
        }
      };

      Chart.pluginService.register(handicapLinePlugin);

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
          horizontalLine: [{
            y: userHandicap,
            style: 'rgba(254, 172, 0, 0.5)',
          }],
        },
      });
    };

  }]);
};
