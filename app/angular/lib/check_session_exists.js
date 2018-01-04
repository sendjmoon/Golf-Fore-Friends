'use strict';

module.exports = function($middlewareProvider) {
  $middlewareProvider.map({
    'checkSessionExists': ['$rootScope', '$http', 'UserService', 'StatsService', function checkSessionExistsMiddleware($rs, $http, userService, statsService) {
      $http.get($rs.baseUrl + '/users/check-session')
        .then((user) => {
          userService.data.user = user.data.userData;
          statsService.getByDocOrUserId(userService.data.user._id)
            .then(this.next);
        })
        .catch((err) => {
          this.redirectTo('/');
        });
    }],
  });
}
