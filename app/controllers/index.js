'use strict';

module.exports = function(app) {
  require('./home_controller')(app);
  require('./auth_controller')(app);
};
