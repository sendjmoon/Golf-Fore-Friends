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
        .then(() => {
          gameData.players.forEach((player) => {
            statsService.updateHandicap(player._id);
            statsService.updateWinRatio(player._id);
          });
        })
        .catch((err) => {
          console.log('Error creating game.');
          console.log(err);
        });
    };

    ctrl.addUser = function(user) {
      let friendsArray = ctrl.friendsData.friends;
      ctrl.players.push(user);
      friendsArray.splice(friendsArray.indexOf(user), 1);
    };

    ctrl.removeUser = function(user) {
      ctrl.players.splice(ctrl.players.indexOf(user), 1);
      ctrl.friendsData.friends.push(user);
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
