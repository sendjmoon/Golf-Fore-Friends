'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$scope', '$http', '$location', '$route', '$routeParams', 'UserService', 'FriendService', 'GameService', 'SearchService', function($rs, $scope, $http, $location, $route, $routeParams, UserService, GameService, SearchService) {

    this.editing = false;

    this.createGame = function(gameData) {
      GameService.createGame(gameData);
    };

    this.addPlayer = function(user) {
      if (user === undefined || user === null)
        return;
      this.game.players.push(user);
      this.friendsList = this.friendsList.filter((friend) => {
        return friend._id !== user._id;
      });
    };

    this.removePlayer = function(user) {
      let playersArray = this.game.players;
      let userIndex = playersArray.indexOf(user);
      this.friendsList.push(playersArray[userIndex]);
      playersArray.splice(userIndex, 1);
    };

    this.updatePlayer = function(player) {
      return new Promise((resolve, reject) => {
        let playerData = {
          emailOrUsername: player.email,
        };

        $http.post('/users', playerData)
          .then((user) => {
            user = user.data;
            UserService.calcHandicap(
              user.gameIds.length,
              user.stats.handicapActual,
              player.strokes
            )
              .then((handicapData) => {
                if (player.win)
                  user.stats.wins++;
                if (player.loss)
                  user.stats.losses++;
                if (player.tie)
                  user.stats.ties++;

                let newData = {
                  stats: {
                    handicap: handicapData.handicap,
                    handicapActual: handicapData.handicapActual,
                    wins: user.stats.wins,
                    losses: user.stats.losses,
                    ties: user.stats.ties,
                  },
                };

                UserService.updateUser(playerData, newData)
                  .then((user) => {
                    resolve(user);
                  });
              });
          })
          .catch(reject);
      });
    };

  }]);
};
