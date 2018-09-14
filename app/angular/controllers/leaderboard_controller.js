'use strict';

module.exports = function(app) {
  app.controller('LeaderboardController', ['$rootScope', '$scope', function($rs, $scope) {
    const ctrl = this;
    let fillArray = [];

    ctrl.fillPlayerBar = function(user) {
      fillArray.push(`${100 - user.stats.handicap}%`);
      $('.gff-progress-bar-fill').each(function(index, val) {
        $(this).css('width', fillArray[index]);
      });
    }

  }]);
}
