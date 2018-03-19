'use strict';

module.exports = function(app) {
  app.controller('CreateGameController', ['$rootScope', '$scope', '$route', 'UserService', 'FriendService', 'CreateGameService', 'GameService', 'ResultService', 'StatsService', function($rs, $scope, $route, userService, friendService, createGameService, gameService, resultService, statsService) {

    const ctrl = this;
    ctrl.user = userService.data.user;
    ctrl.friendsData = friendService.data;
    $scope.players = createGameService.players;
    ctrl.editing = false;

    ctrl.createGame = function(gameData) {
      gameData.players = ctrl.players;
      gameService.newGame(gameData)
        .then($route.reload)
        .catch((err) => {
          console.log(err);
        });
    };

    ctrl.addUser = function(user) {
      let friendsArray = ctrl.friendsData.friends;
      friendsArray.splice(friendsArray.indexOf(user), 1);
      ctrl.players.push(user);
    };

    ctrl.removeUser = function(user) {
      let userIndex = ctrl.players.findIndex((player) => {
        return player.email === user.email;
      });
      ctrl.players.splice(userIndex, 1);
      ctrl.friendsData.friends.push(user);
    };

    ctrl.init = function() {
      let userData = {
        _id: ctrl.user._id,
        fullName: ctrl.user.fullName,
        email: ctrl.user.email,
      };
      friendService.getAllFriends(ctrl.user.email);
    };

    ctrl.init();
  }]);
}
