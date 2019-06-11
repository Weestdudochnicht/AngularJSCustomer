var customerApp = angular.module('customerApp', ['ui.router']);
customerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
  
  //Config for all States
  
    // Used this to remove the # from the links
    $locationProvider.html5Mode(true);
    
    //for all nondefined States go to 404
    $urlRouterProvider.otherwise('/404');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('overview', {
            url: '/',
            templateUrl: 'overview.html'
        })
        .state('index', {
            url: '/index',
            templateUrl: 'overview.html',
            
        })
         .state('detail', {
            url: '/detail',
            templateUrl: 'detailView.html',
            
        })
        .state('404', {
            url: '/404',
            templateUrl: '404.html'
        })
        
});

customerApp.controller('MainCtrl', function($scope,$http,$stateParams) {
   $scope.appName = 'Customerlist';
   
   $scope.dataArray =[];
   $scope.arrayLength = 0;
   
   //All new customer need a gender!
    $scope.newcustomer = {gender:"m"};
   
   //We need this to farmat the Dates from the Json to work with them in inputs
    $scope.prepareDates = function(){
     for(var i=0;i < $scope.dataArray.length;i++){
          if($scope.dataArray[i].birthday){
            $scope.dataArray[i].birthday = new Date($scope.dataArray[i].birthday);
          }
          if($scope.dataArray[i].lastContact){
            $scope.dataArray[i].lastContact = new Date($scope.dataArray[i].lastContact);
          }
      }
    };
   
    //Read local Json File and store it into dataArray
    $scope.getData = function(){
       $http.get('data.json').success(function (data){
    		$scope.dataArray = data;
    		$scope.arrayLength = $scope.dataArray.length;
    		$scope.prepareDates();
    	});
    }
  
    $scope.getData();
    
     //add a Costomer to dataArray
    $scope.addCustomer = function(){
      if($scope.newcustomer && $scope.newcustomer.name && $scope.newcustomer.name.last && $scope.newcustomer.name.first){
        //Generate a new ID
        var id = $scope.arrayLength +1;
        $scope.arrayLength = $scope.arrayLength +1;
        $scope.newcustomer.customerID = id;
        
        if(!$scope.newcustomer.lastContact){
          $scope.newcustomer.lastContact = new Date();
        }
        //push the new Customer to the top of the list
        $scope.dataArray.unshift($scope.newcustomer);
        $scope.newcustomer = {gender:"m"};
      }
      else{
        alert("Sorry but You need at Least a Name and a Forename");
        return;
      }
    };
    
    //Delete Costomer from dataArray
    $scope.deleteCustomer = function(customer){
      if(customer && customer.customerID >=0){
       for(var i=0;i < $scope.dataArray.length;i++){
          if($scope.dataArray[i].customerID == customer.customerID){
            $scope.dataArray.splice(i,1);
          }
        }
      }
      else{
        return;
      }
    };
    
    //set a Costomer from dataArray for Editing
    $scope.selectedCustomer = function(customer){
      $scope.customer = customer;
    };
    
     //update the selected Customer in the dataArray
    $scope.updateCustomer = function(){
      if(!$scope.customer) return;
      else{
        for(var i=0;i < $scope.dataArray.length;i++){
          if($scope.dataArray[i].id == $scope.customer.id){
            $scope.dataArray[i] = $scope.customer;
          }
        }
      }
    };
});
