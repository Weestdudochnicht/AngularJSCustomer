describe('MainCtrl testing suite', function() {

  describe('MainCtrl', function() {
    var $scope;
    beforeEach(module('customerApp'));

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      spyOn(window, 'alert');
      $controller('MainCtrl', {
        $scope: $scope
      });
    }));
   
    it('should return the right name of the application', function() {
      expect($scope.appName).toBe('Customerlist');
    });
    
    it('should add new Customer', function() {
      $scope.newcustomer ={
        "name": {
            "first": "Doobby",
            "last": "Bob"
        },
        "birthday": "1992-10-12",
        "gender": "m",
        "lastContact": "2017-06-01T23:28:56.782Z",
        "customerLifetimeValue": 191.12};
         $scope.addCustomer();
      expect($scope.dataArray.length).toBe(1);
    });
  
    it('should not add a new Customer and alert', function() {
      $scope.newcustomer ={
        "name": {
            "first": "",
            "last": ""
        },
        "birthday": "1992-10-12",
        "gender": "m",
        "lastContact": "2017-06-01T23:28:56.782Z",
        "customerLifetimeValue": 191.12};
         $scope.addCustomer();
      expect(window.alert).toHaveBeenCalledWith("Sorry but You need at Least a Name and a Forename");
    });

    it('should add a Customer and then remove Customer it array', function() {
      $scope.newcustomer ={
        "name": {
            "first": "Doobby",
            "last": "Bob"
        },
        "birthday": "1992-10-12",
        "gender": "m",
        "lastContact": "2017-06-01T23:28:56.782Z",
        "customerLifetimeValue": 191.12};
         $scope.addCustomer();
         $scope.newcustomer.customerID = 1;
         $scope.deleteCustomer($scope.newcustomer);
         expect($scope.dataArray.length).toBe(0);
    });
  
    it('should select the new Customer', function() {
      $scope.newcustomer ={
        "name": {
            "first": "Doobby",
            "last": "Bob"
        },
        "customerID" : 1,
        "birthday": "1992-10-12",
        "gender": "m",
        "lastContact": "2017-06-01T23:28:56.782Z",
        "customerLifetimeValue": 191.12};
     $scope.addCustomer();
     $scope.selectedCustomer($scope.newcustomer);
     expect( $scope.customer).toBe($scope.newcustomer);
    });
    
    it('should change the name of new Customer', function() {
      $scope.newcustomer ={
        "name": {
            "first": "Doobby",
            "last": "Bob"
        },
        "birthday": "1992-10-12",
        "gender": "m",
        "lastContact": "2017-06-01T23:28:56.782Z",
        "customerLifetimeValue": 191.12};
        
     $scope.addCustomer();
     $scope.selectedCustomer($scope.newcustomer);
     
     $scope.customer={
      "name": {
          "first": "Roobby",
          "last": "Bob"
      },
      "customerID" : 1,
      "birthday": "1992-10-12",
      "gender": "m",
      "lastContact": "2017-06-01T23:28:56.782Z",
      "customerLifetimeValue": 191.12};
      
     $scope.updateCustomer();
     expect($scope.dataArray[0]).toBe($scope.customer);
    });
  });
});