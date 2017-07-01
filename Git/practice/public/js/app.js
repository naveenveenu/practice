(function(){
  var app = angular.module("practiceApp",['ui.router', 'dashboard', 'contact']);

  app.controller('mainCtrl',['$scope', '$state', function($scope, $state){
    $scope.firstName = 'Naveen';
    $state.go('dashboard');
  }]);
})();
