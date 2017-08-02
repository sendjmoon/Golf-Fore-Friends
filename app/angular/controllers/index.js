'use strict';

module.exports = function(app) {
  require('./home_controller')(app);
  require('./auth_controller')(app);
  require('./user_controller')(app);
  require('./friend_controller')(app);
};
