'use strict';

module.exports = function(app) {
  app.factory('ResultService', ['$rootScope', '$http', function($rs, $http) {

    const create = function(resultData) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/games/result/create`, resultData)
          .then((result) => {
            resolve(result);
          })
          .catch(reject);
      });
    };

    const calcResults = function(array) {
      return new Promise((resolve, reject) => {
        let nextPlayer;
        let winFound = false;
        let tieFound = false;
        let tieValue = 0;

        if (array.length < 1) return reject({ message: 'No players added to game.' });
        if (array.length === 1) {
          array[0].result = 'solo';
          return resolve(array);
        }

        array.sort((a, b) => {
          return a.strokes - b.strokes;
        });

        array.forEach((player, index) => {
          nextPlayer = array[index + 1];

          if (winFound) return player.result = 'loss';
          if (tieFound) {
            if (player.strokes === tieValue) player.result = 'tie';
            return;
          }

          if (player.strokes < nextPlayer.strokes) {
            player.result = 'win';
            winFound = true;
            return;
          }

          if (player.strokes === nextPlayer.strokes) {
            player.result = 'tie';
            nextPlayer.result = 'tie';
            tieFound = true;
            tieValue = player.strokes;
            return;
          }
        });

        resolve(array);
      });
    };

    return {
      create: create,
      calcResults: calcResults,
    }
  }]);
}
