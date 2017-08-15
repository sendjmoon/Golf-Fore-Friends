'use strict';

module.exports = function(app) {
  require('./dashboard')(app);
  require('./auth')(app);
  require('./friends')(app);
  require('./nav')(app);
  require('./title-header')(app);
  require('./games')(app);
};
