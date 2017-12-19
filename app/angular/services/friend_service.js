'use strict';

module.exports = function(app) {
  app.factory('FriendService', ['$rootScope', '$http', function($rs, $http) {

    let data = {
      allFriends: {},
    };

    let getAllFriends = function(emailOrUsername) {
      return new Promise((resolve, reject) => {
        let userData = {
          emailOrUsername: emailOrUsername,
        };
        $http.post(`${$rs.baseUrl}/friends/all`, userData)
          .then((friends) => {
            data.allFriends.friends = friends.data.map((friend) => {
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

    let addFriend = function(friendId) {
      return new Promise((resolve, reject) => {
        let friendData = {
          _id: friendId,
        };
        $http.post(`${$rs.baseUrl}/friends/add`, friendData)
          .then((res) => {
            console.log(res.data);
            resolve();
          })
          .catch((err) => {
            console.log(err.data);
            reject();
          });
      });
    };

    return {
      getAllFriends: getAllFriends,
      addFriend: addFriend,
      data: data,
    }
  }]);
};
