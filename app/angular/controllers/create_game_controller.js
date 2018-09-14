'use strict';

module.exports = function(app) {
  app.controller('CreateGameController', ['$rootScope', '$scope', '$location', 'UserService', 'FriendService', 'GameService', 'ResultService', 'StatsService', function($rs, $scope, $location, userService, friendService, gameService, resultService, statsService) {

    const ctrl = this;
    ctrl.user = userService.data.user;
    ctrl.friendsData = friendService.data;
    ctrl.players = [];
    ctrl.playersToAdd = [];
    ctrl.editing = false;

    ctrl.createGame = function(gameData) {
      gameData.players = ctrl.players;
      gameService.newGame(gameData)
        .then(ctrl.goTo('games'))
        .catch((err) => {
          console.log(err);
        });
    };

    ctrl.addUser = function(user) {
      ctrl.playersToAdd.splice(ctrl.playersToAdd.indexOf(user), 1);
      ctrl.players.push(user);
    };

    ctrl.removeUser = function(user) {
      let userIndex = ctrl.players.findIndex((player) => {
        return player.email === user.email;
      });
      ctrl.players.splice(userIndex, 1);
      ctrl.playersToAdd.push(user);
    };

    ctrl.goTo = function(location) {
      $location.url(`/${location}`);
    }

    ctrl.init = function() {
      let userData = {
        _id: ctrl.user._id,
        fullName: ctrl.user.fullName,
        email: ctrl.user.email,
      };
      friendService.getAllFriends(ctrl.user.email)
        .then(() => {
          ctrl.playersToAdd = ctrl.friendsData.friends;
          ctrl.playersToAdd.push(userData);
          $scope.$apply();
        });
    };

    ctrl.init();
  }]);
}
