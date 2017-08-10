'use strict';

module.exports = function(app) {
  require('./friends')(app);
  require('./courses')(app);
  require('./games')(app);
};
