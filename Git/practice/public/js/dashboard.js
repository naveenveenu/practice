(function(){
  var app = angular.module('dashboard', []);

  app.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('dashboard', {
      url : '/dashboard',
      controller : 'dashboardCtrl',
      templateUrl : '/views/dashboard.html'
    });
  }]);

  app.controller('dashboardCtrl', ['$scope', function($scope){
    $scope.dashboardValue = "Dashboard..!!";
  }]);


})();
