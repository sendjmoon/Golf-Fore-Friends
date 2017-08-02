'use strict';

module.exports = function(app) {
  require('./auth_controller')(app);
  require('./friend_controller')(app);
  require('./home_controller')(app);
  require('./nav_controller')(app);
  require('./user_controller')(app);
};
