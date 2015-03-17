'use strict';

angular.module('vesselApp').config(function ($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'MainCtrl'
  });
});
