'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$http', function($rs, $http) {
    this.game = {};
    this.game.players = [];
    this.friendsList = [];

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

    this.createGame = function(game) {
      console.log(game);
    };
  }]);
};