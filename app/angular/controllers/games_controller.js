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
      GameService.createGame(gameData);
    };

    ctrl.addUser = function(user) {
      $scope.allFriends.friends.splice($scope.allFriends.friends[$scope.allFriends.friends.indexOf(user)], 1);
      ctrl.players.push(user);
      console.log(ctrl.players);
    };

    ctrl.removeUser = function(user) {
      console.log(ctrl.players.indexOf(user));
      console.log(ctrl.players);
      ctrl.players.splice(ctrl.players[ctrl.players.indexOf(user)], 1);
      $scope.allFriends.friends.push(user);
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
