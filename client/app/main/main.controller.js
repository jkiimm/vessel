'use strict';

angular.module('vesselApp').controller('MainCtrl', function ($scope, $http, socket) {
  $scope.wordsInVessel = [];

  $http.get('/api/vocas').success(function(wordsInVessel) {
    $scope.wordsInVessel = wordsInVessel;
    socket.syncUpdates('voca', $scope.wordsInVessel);
  });

  $scope.languages = [{
    value: 'en', label:'English'
  }, {
    value: 'ko', label: '한국어'
  }];
  $scope.wordASelected = $scope.languages[0];
  $scope.wordBSelected = $scope.languages[1];

  // dev
  $scope.wordA = 'Hello';
  $scope.wordB = '안녕하세요';
  // end dev

  $scope.addWord = function() {
    if($scope.wordA === '' || $scope.wordB === '') { return; }
    var data = { pair: [{
      lang: $scope.wordASelected.value,
      word: $scope.wordA,
    }, {
      lang: $scope.wordBSelected.value,
      word: $scope.wordB,
    }]};
    $http.post('/api/vocas', data);

    // initialize settings
    $scope.wordA = $scope.wordB = '';
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('voca');
  });
});
