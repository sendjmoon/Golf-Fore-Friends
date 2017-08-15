'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$rootScope', '$http', function($rs, $http) {

    this.getFriendsList = function() {
      console.log('get friends list function');
      $http.get('/friends/list')
        .then((friendsList) => {
          this.friendsList = friendsList.data;
        })
        .catch((err) => {
          alert('error getting friends list');
        });
    };

    this.createGame = function() {
      console.log('new game function');
    };
  }]);
};
