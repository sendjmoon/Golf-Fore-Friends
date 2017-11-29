'use strict';

module.exports = function(app) {
  app.factory('FriendService', ['$rootScope', '$http', function($rs, $http) {

    let allFriends = [];

    let getAllFriends = function(emailOrUsername) {
      let userData = {
        emailOrUsername: emailOrUsername,
      };
      return $http.post(`${$rs.baseUrl}/friends/all`, userData)
        .then((friends) => {
          friends.data.forEach((friend) => {
            allFriends.push(friend);
          });
        })
        .catch((err) => {
          console.log('error getting all friends');
        });
    }

    let addFriend = function(friendId) {
      let friendData = {
        _id: friendId,
      };
      return $http.post(`${$rs.baseUrl}/friends/add`, friendData)
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
      allFriends: allFriends,
    }
  }]);
}
