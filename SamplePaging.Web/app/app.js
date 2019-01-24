(function () {
  'use strict';

  var app = angular.module('app', [

    // Angular modules 
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngResource',
    'ngCookies',
    'ui.router',
    'ui.bootstrap',
    'common',
  
    // 3rd Party Modules
    'common.services',
  ]);


  app.run(['$route', '$rootScope', '$q', function ($route, $rootScope, $q) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
      if (current.$$route !== undefined) {
        $rootScope.title = current.$$route.title + ' | BPSC ADMIN';
      } else {
          $rootScope.title = 'E-Recruitment System';
      }
    });
  }]);
})()