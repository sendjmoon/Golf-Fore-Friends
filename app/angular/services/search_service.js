'use strict';

module.exports = function(app) {
  app.factory('SearchService', ['$rootScope', function($rs) {

    let searchResults = [];

    let searchListener = function(prop, searchArray, $input) {
      let inputStr;
      let matchFound = false;
      let matchExists = false;
      let objIndex;

      $input.on('keyup', () => {
        searchArray.filter((obj) => {
          inputStr = $input.val().toUpperCase();
          objIndex = searchResults.indexOf(obj);
          obj[prop] = obj[prop].toUpperCase();

          obj[prop].indexOf(inputStr) > -1 ?
            matchFound = true : matchFound = false;

          objIndex  > -1 ?
            matchExists = true : matchExists = false;

          $rs.$apply(() => {
            if (inputStr.length < 1) {
              return searchResults.forEach((result) => {
                searchResults.splice(searchResults.indexOf(result), 1);
              });
            }

            if (matchFound === false && matchExists)
              searchResults.splice(objIndex, 1);

            if (matchFound) {
              if (matchExists) return;
              else searchResults.push(obj);
            }
          });

        });
      });
    };

    return {
      searchListener: searchListener,
      searchResults: searchResults,
    }
  }]);
};
