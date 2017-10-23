'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$http', '$location', '$route', 'AuthService', 'UserService', function($rs, $http, $location, $route, AuthService, UserService) {

    AuthService.checkSessionExists();

    this.user = $rs.user;
    this.allGames = $rs.user.gameIds;
    this.friendsList = [];
    this.game = {
      players: [],
    };
    this.game.players[0] = $rs.user;

    this.createGame = function(gameData) {
      $http.post('/games/create', gameData)
        .then((game) => {
          let playersArray = game.data.players;
          playersArray.forEach((player) => {
            this.updatePlayer(player)
              .then((playerData) => {
                if (playerData.data.email === $rs.user.email) {
                  $rs.user = playerData.data;
                  window.sessionStorage.setItem('currentUser', JSON.stringify($rs.user));
                }
                $route.reload();
              })
              .catch((err) => {
                alert('error creating game');
              });
          });
        })
        .catch((err) => {
          alert('error creating game');
        });
    };

    this.getGames = function(emailOrUsername) {
      new Promise((resolve, reject) => {
        $http.get('/games/all')
          .then((games) => {
            resolve(games);
          })
          .catch((err) => {
            alert('error getting games');
            reject();
          });
      })
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
            UserService.calcHandicap(user.data)
              .then((handicap) => {
                let handicapData = {
                  handicap: handicap,
                };
                UserService.updateUser(playerData, handicapData)
                  .then((user) => {
                    resolve(user);
                  })
                  .catch(reject);
              })
              .catch(reject);
          })
          .catch(reject);
      });
    };

  }]);
};
