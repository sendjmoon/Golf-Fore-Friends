'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$http', '$location', '$route', 'AuthService', 'UserService', function($rs, $http, $location, $route, AuthService, UserService) {

    AuthService.checkSessionExists();

    this.game = {};
    this.game.players = [];
    this.game.players[0] = $rs.user;
    
    this.friendsList = [];
    this.allGames = [];

    this.createGame = function(gameData) {
      $http.post('/games/create', gameData)
        .then((userData) => {
          $rs.user = userData.data;
          UserService.updateHandicap(userData.data)
            .then((handicap) => {
              $rs.user.handicap = handicap.data;
              window.sessionStorage.setItem('currentUser', JSON.stringify($rs.user));
              $route.reload();
            })
            .catch((err) => {
              alert('error updating user\'s handicap');
            })
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
      delete user.password;
      this.game.players.push(user);
      this.friendsList = this.friendsList.filter((friend) => {
        return friend._id !== user._id;
      });
    };

    this.updatePlayer = function(player) {
      // console.log(player);
    };

    this.removePlayer = function(user) {
      let playersArray = this.game.players;
      let userIndex = playersArray.indexOf(user);
      this.friendsList.push(playersArray[userIndex]);
      playersArray.splice(userIndex, 1);
    };

  }]);
};
