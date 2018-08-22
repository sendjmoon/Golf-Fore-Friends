'use strict';

module.exports = function(app) {
  require('./auth_controller')(app);
  require('./chart/chart_controller')(app);
  require('./comment_controller')(app);
  require('./create_game_controller')(app);
  require('./dashboard_controller')(app);
  require('./friend_controller')(app);
  require('./games_controller')(app);
  require('./landing_controller')(app);
  require('./leaderboard_controller')(app);
  require('./nav_controller')(app);
  require('./settings_controller')(app);
  require('./sub_nav_controller')(app);
};
