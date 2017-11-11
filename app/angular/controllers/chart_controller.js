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
      let ctx = document.getElementById('gameChart');
      let chartOptions = {
        type: 'line',
        data: {
          labels: dateData,
          datasets: [{
            label: 'Strokes',
            data: strokeData,
            options: {
              reverse: true,
            },
            backgroundColor: [
              'rgba(77, 187, 51, 0.2)',
            ],
            borderColor: [
              'rgba(77, 187, 51, 1)',
            ],
            borderWidth: 1,
          }],
        },
      };
      let myChart = new Chart(ctx, chartOptions);
    }

  }]);
};
