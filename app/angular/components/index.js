'use strict';

module.exports = function(app) {
  require('./auth')(app);
  require('./banner')(app);
  require('./dashboard')(app);
  require('./friends')(app);
  require('./games')(app);
  require('./nav')(app);
};
