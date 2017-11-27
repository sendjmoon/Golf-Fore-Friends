'use strict';

module.exports = function(app) {
  app.service('FriendService', ['$rootScope', '$http', function($rs, $http) {
    let friendsArray;

    let getFriendsData = function(options) {
      return new Promise((resolve, reject) => {
        options = options || [];
        $http.post($rs.baseUrl + '/friends/all', options)
          .then((friendsArray) => {
            console.log(friendsArray);
            resolve(friendsArray);
          })
          .catch((err) => {
            console.log('error in friend service');
            console.log(err);
          });
      });
    };

    return {
      getFriendsData: getFriendsData,
      friendsArray: friendsArray,
    }
  }]);
}
