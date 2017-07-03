(function(){
  var app = angular.module('login', []);

  app.config(['$stateProvider', function($stateProvider){
      $stateProvider.state('login', {
        url : '/login',
        controller : 'loginCtrl',
        templateUrl : '/views/login.html'
      });
  }]);

app.controller('loginCtrl', ['$scope', function($scope){
  
}]);

})();
