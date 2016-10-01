'use strict';
var app = angular.module('std-open-data', ['ui.router', 'uiGmapgoogle-maps']);

app.config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
  $urlRouterProvider.otherwise('/inicio');
  $stateProvider
    // Vista Inicio
    .state('inicio', {
      url: '/inicio',
      templateUrl: 'views/sensores-ambientales.html',
      controller: 'SensoresAmbientalesCtrl'
    })
    .state('irigation', {
      url: '/irigation',
      templateUrl: 'views/sensores-de-riego.html',
      controller: 'IrregationCtrl'
    })
    .state('sensores-moviles', {
      url: '/sensores-moviles',
      templateUrl: 'views/sensores-moviles.html',
      controller: 'SensoresMovilesCtrl'
    });
});
