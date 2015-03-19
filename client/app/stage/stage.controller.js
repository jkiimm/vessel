'use strict';

angular.module('vesselApp').controller('StageCtrl', function ($scope, $http, socket) {
  $scope.wordsInVessel = [];

  $http.get('/api/vocas').success(function(wordsInVessel) {
    $scope.wordsInVessel = wordsInVessel;
    socket.syncUpdates('voca', $scope.wordsInVessel);
  });

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('voca');
  });
});

