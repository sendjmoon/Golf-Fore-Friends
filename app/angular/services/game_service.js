'use strict';

module.exports = function(app) {
  app.factory('GameService', ['$rootScope', '$route', '$http', 'UserService', 'StatsService', function($rs, $route, $http, userService, statsService) {

    const create = function(gameData) {
      return new Promise((resolve, reject) => {
        // calcResults(gameData.players)
          // .then((resultsArray) => {
            // gameData.players = resultsArray;
            $http.post(`${$rs.baseUrl}/games/create`, gameData)
              .then((newGame) => {
                resolve(newGame.data);
                // let usersUpdateData = {
                //   usersArray: gameData.players,
                //   updateQuery: {
                //     $addToSet: { gameIds: newGame.data._id },
                //   },
                // };
                // userService.updateManyUsers(usersUpdateData)
                //   .then(() => {
                //     resultsArray.forEach((player) => {
                //       statsService.update(player._id, player.result);
                //     });
                //     $route.reload();
                //     resolve();
                //   });
                // });
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
        // });
      });
    };

    this.getByPublicId = function(gameId) {
      return new Promise((resolve, reject) => {
        $http.get($rs.baseUrl + '/games/' + gameId)
          .then((game) => {
            resolve(game.data);
          })
          .catch(reject);
      });
    };

    this.getAllByPublicId = function(publicIdArray) {
      return new Promise((resolve, reject) => {
        let publicIdData = {
          publicIdArray: publicIdArray,
        };
        $http.post($rs.baseUrl + '/games/all', publicIdData)
          .then((games) => {
            resolve(games.data);
          })
          .catch(() => {
            alert('error getting games');
            reject();
          });
      });
    };

    return {
      create: create,
    }
  }]);
};
