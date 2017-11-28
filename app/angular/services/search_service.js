'use strict';

module.exports = function(app) {
  app.service('SearchService', ['$rootScope', function($rs) {

    let searchListener = function(inputEleId, searchArray) {
      let results = [];
      let searchBox = document.getElementById(inputEleId);
      searchBox.addEventListener('keyup', function() {
        let input = this.value.toUpperCase();
        results = searchArray.filter((item) => {
          if (input.length < 1) {
            results = [];
            return;
          }
          if (item.email.toUpperCase().indexOf(input) > -1) {
            if (results.indexOf(item) > -1) return;
            else results.push(item);
          }
          if (item.email.toUpperCase().indexOf(input) < 0) {
            if (results.indexOf(item) > -1) {
              results.splice(results.indexOf(item), 1);
            }
          }
        });
        return results;
      });
    };

    return {
      searchListener: searchListener,
    }
  }]);
};
