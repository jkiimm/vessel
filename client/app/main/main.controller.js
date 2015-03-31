'use strict';

angular.module('vesselApp').constant('chunkSize', 5);
angular.module('vesselApp').controller('MainCtrl', function ($scope, $http, socket, chunkSize) {
  var vocaCurIdx = 0;
  $scope.wordsInVessel = [];

  $http.get('/api/vocas', {
    params: {begin: vocaCurIdx, limit: chunkSize} 
  }).success(function(wordsInVessel) {
    console.log('first');
    vocaCurIdx += chunkSize;
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



  $scope.loadMoreRecords = function() {
    $http.get('/api/vocas', {
      params: {begin: vocaCurIdx, limit: chunkSize} 
    }).success(function(wordsInVessel) {
      vocaCurIdx += chunkSize;
      $scope.wordsInVessel = $scope.wordsInVessel.concat(wordsInVessel);
    });
  };
});

angular.module('vesselApp').directive('whenscrollends', function($window, $document) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var threshold = 100;
      $document.on('scroll', function() {
        if(window.pageYOffset + window.innerHeight > $document.height() - threshold) {
          scope.$apply(attrs.whenscrollends);
        }
      });
    }
  };
});


