'use strict';

module.exports = function(app) {
  require('./home')(app);
  require('./register')(app);
  require('./signin')(app);
  require('./signout')(app);
};
