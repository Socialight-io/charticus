'use strict';

/**
 * @ngdoc overview
 * @name chartsApp
 * @description
 * # chartsApp
 *
 * Main module of the application.
 */


// set up the _analyticsAppConfig, unless it already exists
if (!_charticusAppConfig) {
    var _charticusAppConfig = {};
}

_charticusAppConfig.templatePath = _charticusAppConfig.templatePath || 'http://static.socialight.io/public/libs/charticus/@@charticusAppVersion/views/'; 

angular
  .module('chartsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $sceDelegateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: _charticusAppConfig.templatePath + 'main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: _charticusAppConfig.templatePath + 'about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
          'self',
          // Allow loading from our assets domain.
          'http://static.socialight.io/public/libs/**'
      ]);
  });
