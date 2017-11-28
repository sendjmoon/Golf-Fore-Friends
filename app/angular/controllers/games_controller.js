'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$scope', '$http', '$location', '$route', '$routeParams', 'AuthService', 'UserService', 'GameService', 'SearchService', function($rs, $scope, $http, $location, $route, $routeParams, AuthService, UserService, GameService, SearchService) {

    this.editing = false;

    this.searchListener = function(inputId) {
      let gamesArray = JSON.parse(window.localStorage.getItem('games'));
      let searchBox = document.getElementById(inputId);
      searchBox.addEventListener('keyup', () => {
        let input = searchBox.value.toUpperCase();
        gamesArray = gamesArray.filter((game) => {
          $rs.$apply(() => {
            if (input.length < 1) {
              this.searchResults = [];
              return;
            }
            if (game.name.toUpperCase().indexOf(input) > -1) {
              if (this.searchResults.indexOf(game) > -1)
                return;
              else
                this.searchResults.push(game);
            }
            if (game.name.toUpperCase().indexOf(input) < 0) {
              if (this.searchResults.indexOf(game) > -1)
                this.searchResults.splice(this.searchResults.indexOf(game), 1);
            }
          });
        });
      });
    };

    this.searchClickHandler = function() {
      let $searchBtn = $('#search-btn');
      $searchBtn.on('click', () => {
        $searchBtn.parent('.search-container')
          .toggleClass('open');
        $searchBtn.find('.fa')
          .toggleClass('fa fa-search, fa fa-ban');

        $('#game-name-input').val('');
        $rs.$apply(() => {
          this.searchResults = [];
        });
      });
    };

    this.createGame = function(gameData) {
      GameService.createGame(gameData)

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
