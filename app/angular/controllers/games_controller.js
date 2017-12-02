'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$scope', 'UserService', 'FriendService', 'GameService', 'SearchService', function($scope, UserService, FriendService, GameService, SearchService) {

    let ctrl = this;
    $scope.FriendService = FriendService;
    $scope.allFriends = FriendService.data.allFriends;

    ctrl.user = UserService.data.user;
    ctrl.players = [];
    ctrl.creating = false;
    ctrl.editing = false;

    ctrl.createGame = function(gameData) {
      gameData.players = ctrl.players;
      GameService.createGame(gameData)
        .catch((err) => {
          console.log('Error creating game.');
        });
    };

    ctrl.addUserToGame = function(user) {
      ctrl.players.push(user);
    };

    ctrl.removePlayer = function(user) {
      let playersArray = ctrl.game.players;
      let userIndex = playersArray.indexOf(user);
      ctrl.friendsList.push(playersArray[userIndex]);
      playersArray.splice(userIndex, 1);
    };

    ctrl.initCreate = function() {
      let userData = {
        _id: ctrl.user._id,
        fullName: ctrl.user.fullName,
        email: ctrl.user.email,
      };
      FriendService.getAllFriends(ctrl.user.email);
      ctrl.players.push(userData);
      ctrl.creating = true;
    };

    ctrl.init = function() {
    };

    // ctrl.init();

  }]);
};
