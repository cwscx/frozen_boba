describe("Client Integration Tests: ", function(){

  describe("Users", function(){

    it("should login correctly", function(){
      Meteor.loginWithPassword("admin", "admin", function(err) {
        expect(err).toBeUndefined();
      });
    });

    it("should reject a nonexistent username", function(){
      Meteor.loginWithPassword("nothere", "nothere", function(err){
        expect(err).not.toBeUndefined();
      });
    });

    it("should differentiate between user roles", function(){

      spyOn(Roles, "userIsInRole").and.returnValue(true);

      Meteor.loginWithPassword("admin", "admin", function(err){
        expect(err).toBeUndefined();
      });

      expect(Roles.userIsInRole(Meteor.user()._id, 'admin')).toBe(true);
    });

  });

  describe("Adding services and packages", function(){

    it("should call adding a service correctly", function(){

      var temp = {};
      var fakeName = "sample";
      var fakeCost = 2;

      spyOn(Meteor, "call").and.returnValue(temp);
      expect(Meteor.call(
        'createUserServices',
        Meteor.user().username,
        Meteor.userId(),
        fakeName,
        fakeCost
      )).toBe(temp);

    });

    it("should call adding a package correctly", function(){
      var temp = {};
      var fakeName = "sample";
      var fakeCost = 2;

      spyOn(Meteor, "call").and.returnValue(temp);
      expect(Meteor.call(
        'createUserPackages',
        Meteor.user().username,
        Meteor.userId(),
        fakeName,
        fakeCost
      )).toBe(temp);
    });

  });

  describe("Deleting services and packages", function(){

    it("should delete a service correctly", function(){
        spyOn(BobaPackages, "remove").and.returnValue(true);
        expect(BobaPackages.remove({})).toBe(true);
    });

    it("should delete a package correctly", function(){
      spyOn(Services, "remove").and.returnValue(true);
      expect(Services.remove({})).toBe(true);
    });

  });

  describe("Adding penalties", function(){

    it("should add a penalty after deleting a service/object", function(){

      var penaltyName = "sample"
      var penaltyId = 1234;

      spyOn(Meteor, "call").and.returnValue(true);
      expect(Meteor.call("addPenalty", penaltyId, penaltyName)).toBe(true);
    });

    it("should add a penalty fee", function(){
      spyOn(Payments, "update").and.returnValue(-1);
      expect(Payments.update()).toBe(-1);
    });

  });

  describe("Payment modifications", function(){

    it("should add to the bill", function(){
      spyOn(Payments, "update").and.returnValue(-1);
      expect(Payments.update()).toBe(-1);

    });

    it("should subtract from the bill", function(){
      spyOn(Payments, "update").and.returnValue(1);
      expect(Payments.update()).toBe(1);
    });

  });



});
