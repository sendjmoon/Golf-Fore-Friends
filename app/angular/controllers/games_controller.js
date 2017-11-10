'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$scope', '$http', '$location', '$route', '$routeParams', 'AuthService', 'UserService', 'GameService', 'SearchService', function($rs, $scope, $http, $location, $route, $routeParams, AuthService, UserService, GameService, SearchService) {

    AuthService.checkSessionExists();

    this.publicId = $routeParams.publicId;
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
    this.searchResults = [];

    $rs.user.gameIds.forEach((game) => {
      this.publicIds.push(game.publicId);
    });

    this.toggleEdit = function(isEditing) {
      isEditing === true ? this.editing = false : this.editing = true;
    };

    this.getByPublicId = function(publicId) {
      GameService.getByPublicId(publicId)
        .then((gameData) => {
          $rs.$apply(() => {
            this.gameData = gameData;
          });
        })
        .catch((err) => {
          alert('error getting game data');
        });
    };

    this.getAllByPublicId = function(publicIds) {
      GameService.getAllByPublicId(publicIds)
        .then((games) => {
          $rs.$apply(() => {
            this.games = games;
            // this.searchListener('game-search', this.games);
            this.games.forEach((game) => {
              game.totalGolfers = game.players.length;
              game.players.forEach((player) => {
                if ($rs.user.email === player.email) {
                  game.yourStrokes = player.strokes;
                  game.yourScore = game.yourStrokes + 72;
                }
              });
              window.localStorage.setItem('games', JSON.stringify(this.games));
            });
          });
        })
        .catch(() => {
          alert('error getting games');
        });
    };

    this.getFromLocalByPublicId = function(publicId) {
      GameService.getFromLocalByPublicId(publicId)
        .then((gameData) => {
          $rs.$apply(() => {
            this.gameData = gameData;
          });
        })
        .catch(() => {
          console.log('error getting from local storage');
        });
    };

    this.getAllByPublicId(this.publicIds);

    this.searchListener = function(inputId) {
      let array = JSON.parse(window.localStorage.getItem('games'));
      let searchBox = document.getElementById(inputId);
      searchBox.addEventListener('keyup', () => {
        let input = searchBox.value;
        console.log(input);
        let results = array.filter((game) => {
          if (input.length < 1) {
            $rs.$apply(() => {
              this.searchResults = [];
            });
          }
          if (game.name.indexOf(input) > - 1) {
            $rs.$apply(() => {
              if (this.searchResults.indexOf(game) > -1) return;
              else this.searchResults.push(game);
            });
            return game;
          }
          if (game.name.indexOf(input) < 0) {
            $rs.$apply(() => {
              this.searchResults.splice(this.searchResults.indexOf(game), 1);
            });
            return game;
          }
        });

      });
    };

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
