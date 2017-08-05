'use strict';

module.exports = function(app) {
  require('./dashboard')(app);
  require('./signup')(app);
  require('./signin')(app);
  require('./friends')(app);
  require('./nav')(app);
  require('./title-header')(app);
};
