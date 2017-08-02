'use strict';

module.exports = function(app) {
  require('./home')(app);
  require('./signup')(app);
  require('./signin')(app);
  require('./signout')(app);
  require('./friends')(app);
  require('./nav')(app);
};
