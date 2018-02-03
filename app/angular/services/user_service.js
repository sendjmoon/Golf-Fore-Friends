'use strict';

module.exports = function(app) {
  app.factory('UserService', ['$rootScope', '$http', function($rs, $http) {

    //TODO: allUsers adds an unnecessary layer to the returned data obj
    const data = {
      user: {},
      allUsers: {},
    };

    const create = function(userData) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/users/signup`, userData)
          .then((newUser) => {
            resolve(newUser.data);
          })
          .catch(reject);
      });
    };

    //TODO: refactor arguments to be more specific
    const updateByEmailOrUsername = function(emailOrUsername, updateOptions) {
      return new Promise((resolve, reject) => {
        let updateData = {
          emailOrUsername: emailOrUsername,
          updateOptions: updateOptions,
        };
        $http.post(`${$rs.baseUrl}/users/update`, updateData)
          .then((res) => {
            resolve(res.data);
          })
          .catch(reject);
      });
    };

    const updateManyById = function(userIds, updateOptions) {
      return new Promise((resolve, reject) => {
        let updateData = {
          userIds: userIds,
          updateOptions: updateOptions,
        };
        $http.post(`${$rs.baseUrl}/users/update-many`, updateData)
          .then(resolve)
          .catch(reject);
      });
    };

    const getByEmailOrUsername = function(emailOrUsername) {
      return new Promise((resolve, reject) => {
        let userData = {
          emailOrUsername: emailOrUsername,
        };

        $http.post('/users', userData)
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    };

    const getAllOtherUsers = function(email) {
      return new Promise((resolve, reject) => {
        let userData = {
          email: email,
        };
        $http.post(`${$rs.baseUrl}/users/all`, userData)
          .then((users) => {
            data.allUsers.users = users.data;
            resolve(users.data);
          })
          .catch((err) => {
            console.log('Error getting all users.');
          });
      });
    };

    return {
      create: create,
      updateByEmailOrUsername: updateByEmailOrUsername,
      updateManyById: updateManyById,
      getByEmailOrUsername: getByEmailOrUsername,
      getAllOtherUsers: getAllOtherUsers,
      data: data,
    }
  }]);
};
