'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$scope', '$http', '$location', '$route', 'AuthService', 'UserService', 'GameService', function($rs, $scope, $http, $location, $route, AuthService, UserService, GameService) {

    AuthService.checkSessionExists();

    this.baseUrl = $rs.baseUrl;
    this.user = $rs.user;
    this.editing = false;
    this.gameData = $rs.gameData;
    this.game = {
      players: [],
    };
    this.game.players[0] = $rs.user;
    this.games = [];
    this.publicIds = [];
    this.friendsList = [];

    $rs.user.gameIds.forEach((game) => {
      this.publicIds.push(game.publicId);
    });

    this.toggleEdit = function(isEditing) {
      isEditing === true ? this.editing = false : this.editing = true;
    };

    this.getAllByPublicId = function(publicIds) {
      GameService.getAllByPublicId(publicIds)
        .then((games) => {
          this.games = games;
          this.games.forEach((game) => {
            game.totalGolfers = game.players.length;
            game.players.forEach((player) => {
              if ($rs.user.email === player.email) {
                game.yourStrokes = player.strokes;
                game.yourScore = game.yourStrokes + 72;
              }
            });
          });
        })
        .catch(() => {
          alert('error getting games');
        });
    };

    this.getAllByPublicId(this.publicIds);

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

    this.getById = GameService.getById;

    this.getFriendsList = function() {
      $http.get('/friends/list')
        .then((friendsList) => {
          this.friendsList = friendsList.data;
        })
        .catch((err) => {
          alert('error getting friends list');
        });
    };

    this.addPlayer = function(user) {
      if (user === undefined || user === null) return;
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
              .then((handicapData) => {
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
