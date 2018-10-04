'use strict';

module.exports = function(app) {
  app.factory('FriendService', ['$rootScope', '$http', function($rs, $http) {

    const data = {};

    const addFriend = function(userId, userStatsId, friendId, friendStatsId) {
      return new Promise((resolve, reject) => {
        const friendData = {
          userId: userId,
          userStatsId: userStatsId,
          friendId: friendId,
          friendStatsId: friendStatsId,
        }

        $http.post(`${$rs.baseUrl}/friends/add`, friendData)
          .then(resolve)
          .catch(reject);
      });
    };

    const getAllFriends = function(emailOrUsername) {
      return new Promise((resolve, reject) => {
        const userData = {
          emailOrUsername: emailOrUsername,
        }

        $http.post(`${$rs.baseUrl}/friends/all`, userData)
          .then((friends) => {
            //TODO: componentize into own function
            data.friends = friends.data.map((friend) => {
              friend = {
                _id: friend.friendId._id,
                fullName: friend.friendId.fullName,
                email: friend.friendId.email,
                stats: friend.stats,
              };
              return friend;
            });
            resolve();
          })
          .catch(reject);
      });
    };

    return {
      addFriend: addFriend,
      getAllFriends: getAllFriends,
      data: data,
    }
  }]);
};
