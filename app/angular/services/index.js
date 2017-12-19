'use strict';

module.exports = function(app) {
  require('./auth_service')(app);
  require('./user_service')(app);
  require('./stats_service')(app);
  require('./friend_service')(app);
  require('./game_service')(app);
  require('./search_service')(app);
  require('./chart_service')(app);
};
