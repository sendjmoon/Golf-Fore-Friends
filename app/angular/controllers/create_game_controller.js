'use strict';

module.exports = function(app) {
  app.controller('CreateGameController', ['$rootScope', 'UserService', 'FriendService', 'GameService', function($rs, UserService, FriendService, GameService) {

    let ctrl = this;
    ctrl.user = UserService.data.user;
    ctrl.allFriends = FriendService.data.allFriends;
    ctrl.players = [];
    ctrl.editing = false;

    ctrl.createGame = function(gameData) {
      gameData.players = ctrl.players;
      GameService.createGame(gameData);
    }

    ctrl.addUser = function(user) {
      let friendsArray = ctrl.allFriends.friends;
      ctrl.players.push(user);
      friendsArray.splice(friendsArray.indexOf(user), 1);
    }

    ctrl.removeUser = function(user) {
      ctrl.players.splice(ctrl.players.indexOf(user), 1);
      ctrl.allFriends.friends.push(user);
    }

    ctrl.init = function() {
      let userData = {
        _id: ctrl.user._id,
        fullName: ctrl.user.fullName,
        email: ctrl.user.email,
      };

      ctrl.players.push(userData);
      FriendService.getAllFriends(ctrl.user.email);
    }

    ctrl.init();
  }]);
}
