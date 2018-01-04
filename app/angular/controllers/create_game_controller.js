'use strict';

module.exports = function(app) {
  app.controller('CreateGameController', ['$rootScope', '$route', 'UserService', 'FriendService', 'GameService', 'ResultService', 'StatsService', function($rs, $route, userService, friendService, gameService, resultService, statsService) {

    const ctrl = this;
    ctrl.user = userService.data.user;
    ctrl.friendsData = friendService.data;
    ctrl.players = [];
    ctrl.editing = false;

    ctrl.createGame = function(gameData) {
      gameData.players = ctrl.players;
      gameService.newGame(gameData)
        .then(ctrl.updatePlayers(gameData.players))
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
      ctrl.players.splice(ctrl.players.indexOf(user), 1);
      ctrl.friendsData.friends.push(user);
    };

    //TODO: move to game service?
    ctrl.updatePlayers = function(playersArray) {
      playersArray.forEach((player) => {
        statsService.updateHandicap(player._id)
          .then(statsService.updateWinRatio(player._id));
      });
    };

    ctrl.init = function() {
      let userData = {
        _id: ctrl.user._id,
        fullName: ctrl.user.fullName,
        email: ctrl.user.email,
      };
      ctrl.players.push(userData);
      friendService.getAllFriends(ctrl.user.email);
    }

    ctrl.init();
  }]);
}
