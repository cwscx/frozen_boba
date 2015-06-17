Meteor.methods({

  createUserServices: function (username, userId, serviceName, cost){
    if(Meteor.userId() == null) {
      console.log("No user is currently logged in.");
      console.log("Cannot create or insert a new service.");
      return false;
    }

    console.log("Service for " + username + " created; " + serviceName);

    ServiceFactory.addService(new Service(username, userId, serviceName, cost));
    return true;
  },

  createUserPackages: function(username, userId, packageName, cost){
    if(Meteor.userId() == null) {
      console.log("No user is currently logged in.");
      console.log("Cannot create or insert a new package.");
      return false;
    }

    console.log("Package for " + username + " created; " + packageName);

    PackageFactory.addPackage(new BobaPackage(username, userId, packageName, cost));
    return true;
  },

  createServiceType: function(serviceName, serviceCost, adminOnly){
    ServiceTypes.insert(new ServiceType(serviceName, serviceCost, adminOnly));
  },

  createPackageType: function(packageName, serviceList, packageType, adminOnly){
    PackageTypes.insert(new PackageType(packageName, serviceList, packageType, adminOnly));
  }

});
