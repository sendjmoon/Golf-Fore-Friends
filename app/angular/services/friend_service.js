'use strict';

module.exports = function(app) {
  app.service('FriendService', ['$rootScope', '$http', function($rs, $http) {
    let allFriends = {};

    let getFriendsData = function(options) {
      return new Promise((resolve, reject) => {
        options = options || [];
        $http.post(`${$rs.baseUrl}/friends/all`, options)
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

    //TODO: pass user email or username as argument
    let getAllFriends = function(emailOrUsername) {
      let userData = {
        emailOrUsername: emailOrUsername,
      };
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/friends/all`, userData)
          .then((friends) => {
            allFriends.friends = friends.data;
          })
          .catch((err) => {
            console.log('error getting all friends');
          });
      });
    }

    let addFriend = function(friendId) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/friends/add`, friendId)
          .then((friend) => {
            console.log(friend);
            resolve();
          })
          .catch(reject);
      })
    };

    return {
      getFriendsData: getFriendsData,
      getAllFriends: getAllFriends,
      allFriends: {
        data: allFriends,
      },
    }
  }]);
}
