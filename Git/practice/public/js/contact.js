(function(){
  var app = angular.module('contact', []);

  app.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('contact', {
      url : '/contact',
      controller : 'contactCtrl',
      templateUrl : '/views/contact.html'
    });
  }]);

  app.controller('contactCtrl', ['$scope', function($scope){
    // $scope.phoneNumber = 9964488889;
    $scope.name='';
    $scope.phone='';
    $scope.addressBook = [];
    $scope.submit = function(){
      var address = {};
      address['name'] = $scope.name;
      address.phone = $scope.phone;
      $scope.addressBook.push(address);
      $scope.name='';
      $scope.phone='';
    };

    $scope.delete = function(name, phone){
      var index = $scope.addressBook.findIndex(i => (i.name === name && i.phone === phone));
      console.log("index >>>>" +index);
      if(index > -1){
        $scope.addressBook.splice(index, 1);
      };
    };
  }]);
})();
