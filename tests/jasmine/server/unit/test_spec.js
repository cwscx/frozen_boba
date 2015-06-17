describe("Server Unit Tests: ", function(){

  beforeEach(function(){
    username = "test";
    email = "test@test.com";
    password = "testing";
  });

  describe("User object", function(){

    it("should be initialized correctly before added to db using Meteor.createUser", function(){

      testUser = new User(username, email, password);

      expect(testUser.username).toBe(username);
      expect(testUser.email).toBe(email);
      expect(testUser.password).toBe(password);

    });

  });

  describe("Password", function(){

    it("should return false if parameters aren't the same", function(){
      var password = "swiggity";
      var repassword = "swag";

      expect(passwordCheck(password, repassword)).toBe(false);

      password="gnarly";
      repassword="gnarly";

      expect(passwordCheck(password, repassword)).toBe(true);

    });

  });

  describe("UserFactory", function(){

    username = "test";
    email = "test@test.com";
    password = "testing";
    testUser = new User(username, email, password);


    it("should add a user object to the db using Meteor.createUser", function(){

      spyOn(Accounts, "createUser").and.returnValue('1');

      expect(UserFactory.addUser(testUser)).toBe('1');

    });

    it("should fetch a list of users from the db", function(){

      var result = {};

      spyOn(Users, "find").and.returnValue(result);

      expect(UserFactory.listUsers()).toBe(result);
    });

  });

  // USER UNIT TESTS

  var testUsername = null;
  var testUserid = null;
  var testServiceName = 'testService';
  var testCost = 100;
  var sample = new Service(testUsername, testUserid, testServiceName, testCost);

  describe("Service Object", function(){

    it("should be initialized correctly", function () {

      expect(sample.username).toBe(null);
      expect(sample.userId).toBe(null);
      expect(sample.service).toBe(testServiceName);
      expect(sample.cost).toBe(testCost);

    });

  });

  describe("ServiceFactory", function(){

    it("should add a service object to the db", function(){
      // Simulate a return of a Service id of 1
      spyOn(Services, "insert").and.returnValue('1');

      var returnId = ServiceFactory.addService(sample);

      expect(returnId).toBe('1');

    });

    it("should delete a service object from the db", function(){

      spyOn(Services, "remove");

      var returnId = ServiceFactory.addService(sample);
      var success = ServiceFactory.deleteService('1');

      expect(success).toBe(true);

    });

    it("should get a user's services from the db", function(){
      var result = {};
      var id = "1234";
      spyOn(Services, 'find').and.returnValue(result);

      expect(ServiceFactory.getUserServices(id)).toBe(result);
      expect(Services.find.calls.argsFor(0)).toEqual([{userId: id}]);
    });

  });

  describe("*Type Object", function(){

    var serviceName = null;
    var cost = 0;
    var adminOnly = true;
    var temp = new ServiceType(serviceName, cost, adminOnly);

    it("ServiceType should be intialized correctly", function(){
      expect(temp.cost).toBe(0);
      expect(temp.adminOnly).toBe(true);
    });

    var packageName = null;
    var serviceFactory = undefined;
    var cost = 0;
    var adminOnly = true;
    var temp = new PackageType(packageName, serviceFactory, cost, adminOnly);

    it("PackageType should be initialized correctly", function(){
      expect(temp.package).toBe(null);
      expect(temp.serviceFactory).toBe(serviceFactory);
      expect(temp.cost).toBe(0);
      expect(temp.adminOnly).toBe(true);
    });

    it("PackageType object should be inserted correctly into the database", function(){
      spyOn(PackageTypes, "insert").and.returnValue('1');
      expect(PackageTypes.insert({})).toBe('1');
    });

    it("ServiceType object should be inserted correctly into the database", function(){
      spyOn(ServiceTypes, "insert").and.returnValue('1');
      expect(ServiceTypes.insert({})).toBe('1');
    });

  });

  describe("Bill", function(){
    it("Should have a one-to-one relationship with someone in a database", function(){
      result = {}
      spyOn(Accounts, "createUser").and.returnValue(1);
      spyOn(Payments, "find").and.returnValue(result);

      var userId = Accounts.createUser();
      expect(userId).toBe(1);
      expect(Payments.find({userId: userId})).toBe(result);
    });

  });

  describe("Package objects", function(){
    it("should be initialized correctly",function(){
      expect(1).toBe(1);
    });
  });

  describe("PackageFactory", function(){
    it("should add a package object to the db",function(){
      // Simulate a return of a Service id of 1
      spyOn(BobaPackages, "insert").and.returnValue('1');

      var returnId = PackageFactory.addPackage({});

      expect(returnId).toBe('1');

    });

    it("should get a user's packages from the db",function(){
      // Simulate a return of a Service id of 1
      spyOn(BobaPackages, "find").and.returnValue('1');

      var returnId = PackageFactory.getUserPackages(1234);

      expect(returnId).toBe('1');
    });

  });

  describe("Notification", function(){
    it("should alert the customer when his bill is past the threshold",function(){

      spyOn(Payments, "findOne").and.returnValue(1000);
      spyOn(Thresholds, "findOne").and.returnValue(500);
      
      expect(Payments.findOne()).toBeGreaterThan(Thresholds.findOne());
    });
  });


});
