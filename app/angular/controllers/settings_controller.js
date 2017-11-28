'use strict';

module.exports = function(app) {
  app.controller('SettingsController', ['$rootScope', function($rs) {

    $('#avatar-input').change(function() {
      console.log($(this).prop('files'));
    })
  }]);
}
