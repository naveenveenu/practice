(function(){
  var app = angular.module('contact', []);

  app.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('contact', {
      url : '/contact',
      controller : 'contactCtrl',
      templateUrl : '/views/contact.html'
    });
  }]);

  app.controller('contactCtrl', ['$scope', '$http', function($scope, $http){
    // $scope.phoneNumber = 9964488889;
    $scope.name='';
    $scope.phone='';

    //For ng-if
    $scope.editName='';
    $scope.editableIndex='';

    $scope.addressBook = [];
    // to fetch from db
    fetchContacts = function(){
      $http.get('/contact/getContacts', {}).then(function(res){
        $scope.addressBook = res.data;
      },
      function(err){
        console.log(err);
      });
    };

    fetchContacts();

    $scope.submit = function(){
      var address = {};
      address['name'] = $scope.name;
      address.phone = $scope.phone;
      // $scope.addressBook.push(address); //without backend
      $http.post('/contact/addContact', address).then(function(res){
          console.log(res);
          fetchContacts();
      },function(err){
          console.log(err);
      });
      $scope.name='';
      $scope.phone='';
    };

    $scope.delete = function(userId){
      // $scope.addressBook.push(address); //without backend
      $http.post('/contact/deleteContact', {"userId" : userId}).then(function(res){
          console.log(res);
          fetchContacts();
      },function(err){
          console.log(err);
      });

      // var index = $scope.addressBook.findIndex(i => (i.name === name && i.phone === phone));
      // console.log("index >>>>" +index);
      // if(index > -1){
      //   $scope.addressBook.splice(index, 1);
      // };
    };

    $scope.setEditable = function(index){
      $scope.editName = true;
      $scope.editableIndex = index;
    };

    $scope.saveName = function(index){
      $http.post('/contact/updateContact', {'address': $scope.addressBook[index]}).then(function(res){
        console.log(res);
        fetchContacts();
      },function(err){
          console.log(err);
      });
      $scope.editName = false;
      $scope.editableIndex = -1;
    };

    
  }]);
})();
