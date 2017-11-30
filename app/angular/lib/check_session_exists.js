'use strict';

module.exports = function($middlewareProvider) {
  $middlewareProvider.map({
    'checkSessionExists': ['$rootScope', '$http', 'UserService', function checkSessionExistsMiddleware($rs, $http, UserService) {
      $http.get($rs.baseUrl + '/users/check-session')
        .then((res) => {
          UserService.data.user = res.data.user;
          this.next();
        })
        .catch((err) => {
          this.redirectTo('/');
        });
    }],
  });
}
