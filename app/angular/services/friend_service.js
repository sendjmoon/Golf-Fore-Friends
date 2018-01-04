'use strict';

module.exports = function(app) {
  app.factory('FriendService', ['$rootScope', '$http', function($rs, $http) {

    const data = {};

    const addFriend = function(userId, statsId) {
      return new Promise((resolve, reject) => {
        let friendData = {
          userId: userId,
          statsId: statsId,
        };
        $http.post(`${$rs.baseUrl}/friends/add`, friendData)
        .then(resolve)
        .catch(reject);
      });
    };

    const getAllFriends = function(emailOrUsername) {
      return new Promise((resolve, reject) => {
        let userData = {
          emailOrUsername: emailOrUsername,
        };
        $http.post(`${$rs.baseUrl}/friends/all`, userData)
          .then((friends) => {
            data.friends = friends.data.map((friend) => {
              return friend.friendId;
            });
            resolve();
          })
          .catch((err) => {
            console.log('error getting all friends');
            reject();
          });
      });
    };

    return {
      addFriend: addFriend,
      getAllFriends: getAllFriends,
      data: data,
    }
  }]);
};
