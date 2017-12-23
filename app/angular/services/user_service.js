'use strict';

module.exports = function(app) {
  app.factory('UserService', ['$rootScope', '$http', function($rs, $http) {

    const data = {
      user: {},
      allUsers: {},
    };

    const create = function(userData) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/users/signup`, userData)
          .then((newUserId) => {
            resolve(newUserId.data);
          })
          .catch(reject);
      });
    };

    const update = function(updateData) {
      return new Promise((resolve, reject) => {
        const newData = {
          updateData: updateData,
        };
        $http.post(`${$rs.baseUrl}/users/update`, newData)
          .then((res) => {
            resolve(res.data);
          })
          .catch(reject);
      });
    };

    const updateManyById = function(updateData) {
      return new Promise((resolve, reject) => {
        $http.post(`${$rs.baseUrl}/users/update-many`, updateData)
          .then(resolve)
          .catch(reject);
      });
    };

    let getByEmailOrUsername = function(emailOrUsername) {
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

    let getAllUsers = function(emailOrUsername) {
      return new Promise((resolve, reject) => {
        let userData = {
          emailOrUsername: emailOrUsername,
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
      update: update,
      updateManyById: updateManyById,
      getByEmailOrUsername: getByEmailOrUsername,
      getAllUsers: getAllUsers,
      data: data,
    }
  }]);
};
