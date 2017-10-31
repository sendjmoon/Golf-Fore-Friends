'use strict';

module.exports = function(app) {
  require('./friends')(app);
  require('./games')(app);
};
