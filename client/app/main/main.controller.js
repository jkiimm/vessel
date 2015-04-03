'use strict';

angular.module('vesselApp').constant('chunkSize', 5);
angular.module('vesselApp').controller('MainCtrl', function ($scope, $http, socket, chunkSize) {
  var vocaCurIdx = 0;
  $scope.wordsInVessel = [];

  var addEditFlag = function(data) {
    data = data.map(function(d) {
      d.isEditable = d.isEditable || false;
      return d;
    }); 
  };

  $http.get('/api/vocas', {
    params: {begin: vocaCurIdx, limit: chunkSize} 
  }).success(function(wordsInVessel) {
    vocaCurIdx += chunkSize;
    addEditFlag(wordsInVessel);
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

  $scope.addVoca = function() {
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
      addEditFlag(wordsInVessel);
      $scope.wordsInVessel = $scope.wordsInVessel.concat(wordsInVessel);
    });
  };

  $scope.editVoca = function(voca) {
    voca.isEditable = true;
  };
  $scope.cancelEdit = function(voca) {
    voca.isEditable = false; 
  };

  $scope.delVoca = function(voca) {
    $http.delete('/api/vocas/' + voca._id);
  };
  $scope.updateVoca = function(voca) {
    var data = { pair: [{
      lang: $scope.wordASelected.value,
      word: voca.pair[0].word,
    }, {
      lang: $scope.wordBSelected.value,
      word: voca.pair[1].word,
    }]};
    console.log(data);

    $http.put('/api/vocas/' + voca._id, data);
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


