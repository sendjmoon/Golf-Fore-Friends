'use strict';

module.exports = function(app) {
  app.factory('SearchService', ['$rootScope', function($rs) {

    let searchResults = [];

    let searchListener = function(options) {
      let inputStr;
      let matchFound = false;
      let matchExists = false;
      let matchObjIndex;

      let searchBy = options.searchBy;
      let $input = $(`#${options.inputId}`);
      let searchArray = options.searchArray;
      let compareArray = options.compareArray;
      let compareFn = options.compareFn;

      $input
        .unbind('keyup')
        .on('keyup', () => {
          searchArray.filter((searchObj) => {
            inputStr = $input.val().toUpperCase();
            matchObjIndex = searchResults.indexOf(searchObj);

            searchObj[searchBy].toUpperCase().indexOf(inputStr) > -1 ?
              matchFound = true : matchFound = false;

            matchObjIndex > -1 ?
              matchExists = true : matchExists = false;

            $rs.$apply(() => {
              if (inputStr.length < 1) {
                return searchResults.forEach((result) => {
                  searchResults.splice(searchResults.indexOf(result), 1);
                });
              }

              if (matchFound === false && matchExists)
                searchResults.splice(matchObjIndex, 1);

              if (matchFound) {
                if (compareFn) compareFn(searchObj, compareArray);
                if (matchExists) return;
                else searchResults.push(searchObj);
              }
            });
          });
        });
    }

    let compareIfFriends = function(obj, compareArray) {
      compareArray.forEach((compareObj) => {
        if (obj.isFriend) return;
        obj._id === compareObj._id ?
          obj.isFriend = true : obj.isFriend = false;
      });
    }

    return {
      searchListener: searchListener,
      compareIfFriends: compareIfFriends,
      searchResults: searchResults,
    }
  }]);
};
