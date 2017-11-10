'use strict';

module.exports = function(app) {
  app.service('SearchService', ['$rootScope', function($rs) {

    this.searchListener = function(inputId, array) {
      let results = [];
      let searchBox = document.getElementById(inputId);
      searchBox.addEventListener('keyup', function() {
        let input = this.value;
        results = array.filter((item) => {
          if (item.name.indexOf(input) > -1) return item;
        });
      });
      return results;
    };
  }]);
};
