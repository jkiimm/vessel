'use strict';

angular.module('vesselApp').controller('StageCtrl', function ($scope, $http, socket) {
  $scope.stageVoca = [];

  // Fisher–Yates shuffle algorithm
  var shuffleArray = function(array) {
    var tmp, i;

    for(var m = array.length - 1; m > 0; m--) {
      i = Math.floor(Math.random() * m);

      tmp = array[m];
      array[m] = array[i];
      array[i] = tmp;
    }

    return array;
  }

  $http.get('/api/vocas').success(function(wordsInVessel) {
    $scope.stageVoca = shuffleArray(_.clone(wordsInVessel));
  });

  $scope.$on('$destroy', function () {
  });
});

