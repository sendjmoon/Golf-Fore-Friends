'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$http', '$location', '$route', 'AuthService', function($rs, $http, $location, $route, AuthService) {

    AuthService.checkSessionExists();

    this.game = {};
    this.game.players = [];
    this.friendsList = [];
    this.allGames = [];

    this.game.players[0] = $rs.user;

    this.createGame = function(gameData) {
      $http.post('/games/create', gameData)
        .then((newGame) => {
          $route.reload();
        })
        .catch((err) => {
          alert('error creating game');
        });
    };

    this.getGames = function() {
      $http.get('/games/all')
        .then((games) => {
          $rs.user.gameIds = games.data;
          this.allGames = games.data;
        })
        .catch((err) => {
          alert('error getting games');
        });
    };

    this.getFriendsList = function() {
      $http.get('/friends/list')
        .then((friendsList) => {
          friendsList.data.forEach((friend) => {
            delete friend.password;
            delete friend.$$hashKey;
          });
          this.friendsList = friendsList.data;
        })
        .catch((err) => {
          alert('error getting friends list');
        });
    };

    this.addPlayer = function(user) {
      if (user === undefined || user === null) return;
      user = JSON.parse(user);
      this.game.players.push(user);
      this.friendsList = this.friendsList.filter((friend) => {
        return friend._id !== user._id;
      });
    };

    this.updatePlayer = function(player) {
      console.log(player);
    };

    this.removePlayer = function(user) {
      let playersArray = this.game.players;
      let userIndex = playersArray.indexOf(user);
      this.friendsList.push(playersArray[userIndex]);
      playersArray.splice(userIndex, 1);
    };

  }]);
};
