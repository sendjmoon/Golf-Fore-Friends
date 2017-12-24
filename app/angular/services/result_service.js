'use strict';

module.exports = function(app) {
  app.factory('ResultService', ['$rootScope', '$http', function($rs, $http) {

    const create = function(gameId, playersArray) {
      return new Promise((resolve, reject) => {
        calcResults(playersArray)
          .then((resultsArray) => {
            const resultsData = {
              gameId: gameId,
              resultsArray: resultsArray,
            };
            $http.post(`${$rs.baseUrl}/games/result/create`, resultsData)
              .then((results) => {
                resolve(results.data);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    };

    const aggregate = function(matchOptions, groupOptions) {
      return new Promise((resolve, reject) => {
        let aggregateData = {
          matchOptions: JSON.stringify(matchOptions),
          groupOptions: JSON.stringify(groupOptions),
        };
        $http.post(`${$rs.baseUrl}/games/result/aggregate`, aggregateData)
          .then((aggregatedData) => {
            resolve(aggregatedData.data);
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
          player.strokes = parseInt(player.strokes);
          if (nextPlayer) nextPlayer.strokes = parseInt(nextPlayer.strokes);

          if (winFound) return player.result = 'loss';

          if (tieFound) {
            if (player.strokes === tieValue) player.result = 'tie';
            if (player.strokes > tieValue) player.result = 'loss';
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
      aggregate: aggregate,
      calcResults: calcResults,
    }
  }]);
}
