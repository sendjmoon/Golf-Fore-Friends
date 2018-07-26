'use strict';

module.exports = function(app) {
  app.controller('SettingsController', ['$rootScope', '$scope', '$http', function($rs, $scope, $http) {

    let ctrl = this;

    ctrl.submit = function(file) {
      console.log(file);
      console.log(this.avatarFile);
    }

    // $('#avatar-input').change(function() {
    //   console.log($scope.testFile);
    //   let avatarFile = $(this).prop('files')[0];
    //   let avatarData = {
    //     avatarFile: avatarFile,
    //   };
    //   return new Promise((resolve, reject) => {
    //     $http.post(`${$rs.baseUrl}/users/avatar`, avatarData)
    //       .then(resolve)
    //       .catch(reject);
    //   });
    // });
  }]);
}
