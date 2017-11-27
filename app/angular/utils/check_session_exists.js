'use strict';

module.exports = function($middlewareProvider) {
  $middlewareProvider.map({
    'checkSessionExists': function() {
      this.next();
    },
  });
}
