'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$http', function($rs, $http) {
    this.players = [];
    this.friendsList = [];

    this.getFriendsList = function() {
      console.log('get friends list function');
      $http.get('/friends/list')
        .then((friendsList) => {
          this.friendsList = friendsList.data;
        })
        .then(() => {
          console.log(this.friendsList);
        })
        .catch((err) => {
          alert('error getting friends list');
        });
    };

    this.addToGame = function(user) {
      this.players.push(user);
      console.log(this.players);
    };

    this.createGame = function() {
      console.log('this.players');
      console.log(this.players);
      console.log('new game function');
      console.log(this.friendsList);
    };
  }]);
};
