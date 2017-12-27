'use strict';

module.exports = function($middlewareProvider) {
  $middlewareProvider.map({
    'checkSessionExists': ['$rootScope', '$http', 'UserService', function checkSessionExistsMiddleware($rs, $http, userService) {
      $http.get($rs.baseUrl + '/users/check-session')
        .then((res) => {
          userService.data.user = res.data.userData;
          this.next();
        })
        .catch((err) => {
          this.redirectTo('/');
        });
    }],
  });
}
