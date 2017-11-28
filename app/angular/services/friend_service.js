'use strict';

module.exports = function(app) {
  app.service('FriendService', ['$rootScope', '$http', function($rs, $http) {
    let allFriends = {};

    let getAllFriends = function(emailOrUsername) {
      return new Promise((resolve, reject) => {
        let userData = {
          emailOrUsername: emailOrUsername,
        };
        $http.post(`${$rs.baseUrl}/friends/all`, userData)
          .then((friends) => {
            allFriends.friends = friends.data;
            resolve();
          })
          .catch((err) => {
            console.log('error getting all friends');
            reject();
          });
      });
    }

    let addFriend = function(friendId) {
      let friendData = {
        _id: friendId,
      };
      $http.post(`${$rs.baseUrl}/friends/add`, friendData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.data);
        });
    };

    return {
      getAllFriends: getAllFriends,
      addFriend: addFriend,
      data: {
        allFriends: allFriends,
      },
    }
  }]);
}
