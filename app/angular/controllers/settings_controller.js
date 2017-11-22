'use strict';

module.exports = function(app) {
  app.controller('SettingsController', ['$rootScope', function($rs) {
    this.user = JSON.parse(window.sessionStorage.getItem('currentUser'));
    
    $('#avatar-input').change(function() {
      console.log($(this).prop('files'));
    })
  }]);
}
