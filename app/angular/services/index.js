'use strict';

module.exports = function(app) {
  require('./auth_service')(app);
  require('./user_service')(app);
  require('./game_service')(app);
};
