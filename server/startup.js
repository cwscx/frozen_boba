// This file contains everything the server should do when it starts up,
// like insert the initial Service and Package types and etc.
Meteor.startup(function(){

  console.log("Intializing server...");

  if(!Meteor.roles.findOne({name: "admin"}))
      Roles.createRole("admin");
  if(!Meteor.roles.findOne({name: "customer"}))
      Roles.createRole("customer");

  if(ServiceTypes.find().count() == 0){
    console.log("Adding initial ServiceTypes");

    ServiceTypes.insert(new ServiceType("wireless", 69.99, false));
    ServiceTypes.insert(new ServiceType("internet", 55.99, false));
    ServiceTypes.insert(new ServiceType("landline", 39.99, false));
    ServiceTypes.insert(new ServiceType("boba delivery", 9.99, true));

  }

  if(PackageTypes.find().count() == 0){
    console.log("Adding initial PackageTypes");

    PackageTypes.insert(
      new PackageType('mega', ["wireless", "internet", "landline", "boba delivery"],
      99.99,
      false
      )
    );

    PackageTypes.insert(
      new PackageType('mini', ["wireless", "internet"],
      79.99,
      false
      )
    );

  }

  // Create default "super" accounts, for testing only
  createAdmin("admin");
  createAdmin("marketing_rep");
  createAdmin("customer_service");
});

//ServiceType Class
function ServiceType(serviceName, cost, adminService){

  this.service = serviceName;     // Service name
  this.cost = cost;               // Service cost
  this.adminOnly = adminService;  // Whether this service can only be seen
                                  // by the admins or not.
};

//PackageType Class
function PackageType(packageName, services, cost, adminPackage){

  this.package = packageName;     // Package name
  this.serviceList = services     // List of ServiceTypes included in package
  this.cost = cost;               // Package cost
  this.adminOnly = adminPackage;  // Whether this service can only be seen
                                  // by the admins or not.
};

function createAdmin(kind){
  if(Users.find({"username": kind}).count() < 1){
    var userId =  Accounts.createUser({
                    username: kind,
                    password: kind });
    Roles.addUsersToRoles(userId, [kind]);
    console.log("Admin \"" + kind + "\" created.");
  }
  else
    console.log("Admin \"" + kind + "\" loaded from database.");
}
