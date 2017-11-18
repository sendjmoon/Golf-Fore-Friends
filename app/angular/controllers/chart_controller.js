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
      Chart.pluginService.register(chartjsPluginAnnotation);

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

      let gameChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          defaultFontColor: '#fff',
          responsive: false,
          layout: {
            padding: {
              top: 30,
              right: 15,
              bottom: 15,
              left: 15,
            },
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: '#f1f1f1',
              },
              ticks: {
                fontColor: '#4b4e54',
              },
            }],
            yAxes: [{
              gridLines: {
                color: '#f1f1f1',
              },
              ticks: {
                fontColor: '#4b4e54',
              }
            }],
          },
          elements: {
            line: {
              tension: 0.1,
              fill: false,
              borderColor: 'rgba(75, 78, 84, 0.9)',
              pointBackgroundColor: 'rgba(254, 172, 0, 1)',
              pointBorderColor: 'rgba(254, 172, 0, 1)',
            },
            point: {
              radius: 3,
              hoverRadius: 5,
              backgroundColor: 'rgba(254, 172, 0, 0.8)',
              borderColor: 'rgba(254, 172, 0, 0.8)',
            },
          },
          tooltips: {
            xPadding: 10,
            yPadding: 10,
            cornerRadius: 2,
            caretSize: 8,
            backgroundColor: 'rgba(75, 78, 84, 0.8)',
            titleFontSize: 14,
            titleSpacing: 4,
            titleMarginBottom: 10,
            bodyFontSize: 14,
            bodySpacing: 4,
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
              borderColor: 'rgba(77, 187, 51, 0.3)',
              borderWidth: 5,
              label: {
                backgroundColor: 'rgba(77, 187, 51, 0.4)',
                position: 'center',
                enabled: true,
                content: 'Handicap: ' + userHandicap,
              },
            }],
          },
        },
      });
    };

  }]);
};
