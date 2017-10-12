'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$http', function($rs, $http) {
    this.game = {};
    this.game.players = [];
    this.game.players[0] = $rs.user;
    this.friendsList = [];

    this.getGames = function() {
      console.log('get games fxn');
      $http.get('/games/all')
        .then((games) => {
          console.log(games);
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

    this.createGame = function(gameData) {
      $http.post('/games/create', gameData)
        .then((newGame) => {
          console.log(newGame.data);
        })
        .catch((err) => {
          alert('error creating game');
        });
    };
  }]);
};
