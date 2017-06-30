'use strict';

module.exports = function(app) {
  require('./home')(app);
  require('./signup')(app);
  require('./signin')(app);
  require('./signout')(app);
};
