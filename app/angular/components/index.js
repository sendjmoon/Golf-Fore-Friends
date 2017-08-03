'use strict';

module.exports = function(app) {
  require('./home')(app);
  require('./signup')(app);
  require('./signin')(app);
  require('./friends')(app);
  require('./nav')(app);
};
