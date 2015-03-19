'use strict';

angular.module('vesselApp').config(function ($stateProvider) {
  console.log($stateProvider);
  $stateProvider.state('stage', {
    url: '/stage',
    templateUrl: 'app/stage/stage.html',
    controller: 'StageCtrl'
  });
});
