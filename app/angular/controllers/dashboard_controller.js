'use strict';

module.exports = function(app) {
  app.controller('DashboardController', ['$rootScope', '$location', '$http', 'AuthService', 'GameService', 'UserService', function($rs, $location, $http, AuthService, GameService, UserService) {

    AuthService.checkSessionExists();
    this.user = $rs.user;
    this.rankArray = [];

    this.rankPlayers = function() {
      GameService.getAllFriends()
        .then((allFriends) => {
          GameService.rankPlayers(allFriends)
            .then((rankData) => {
              console.log('great success');
              console.log(rankData);
              this.rankArray = rankData;
            })
            .catch((err) => {
              console.log('error ranking players');
            });
        })
        .catch((err) => {
          console.log('error getting all friends');
        });
    };

    this.rankPlayers();
    console.log(this.rankArray);
  }]);
};
