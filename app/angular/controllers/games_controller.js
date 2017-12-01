'use strict';

module.exports = function(app) {
  app.controller('GamesController', ['$scope', 'UserService', 'FriendService', 'GameService', 'SearchService', function($scope, UserService, FriendService, GameService, SearchService) {

    let ctrl = this;
    $scope.FriendService = FriendService;
    $scope.allFriends = FriendService.data.allFriends;
    ctrl.players = [];

    ctrl.user = UserService.data.user;
    ctrl.creating = false;
    ctrl.editing = false;

    ctrl.createGame = function(gameData) {
      GameService.createGame(gameData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    ctrl.addPlayer = function(user) {
      if (user === undefined || user === null)
        return;
      ctrl.game.players.push(user);
      ctrl.friendsList = ctrl.friendsList.filter((friend) => {
        return friend._id !== user._id;
      });
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
