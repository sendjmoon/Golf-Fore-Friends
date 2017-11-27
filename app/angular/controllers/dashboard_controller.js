'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'GameService', 'UserService', 'FriendService', function($rs, $location, $http, GameService, UserService, FriendService) {

    // this.userStats = UserService.user.stats;
    this.leaderboardArray = [];

    this.getFriendsData = function(options) {
      FriendService.getFriendsData(options)
        .then((friendsData) => {
          console.log('dash controller');
          console.log(friendsData);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    this.rankFriends = function() {
      GameService.rankFriends()
        .then((sortedFriends) => {
          $rs.$apply(() => {
            this.leaderboardArray = sortedFriends;
          });
        })
        .catch((err) => {
          console.log('error ranking players');
        });
    };
  }]);
};
