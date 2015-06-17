Payment = function(id){
  this.bill = 0;
  this.userId = id;
}

Penalty = function(userId, penaltyId, penaltyName){
  this.penaltyId = penaltyId;
  this.userId = userId;
  this.penaltyName = penaltyName;

  create = new Date();
  due = new Date(create);
  due.setMonth(create.getMonth() + 1);

  this.dateCreated = create;
  this.penaltyDue = due;
}

Threshold = function(id){
  this.threshold = 300;
  this.userId = id;
}

User = function(username, email, password){
  this.username = username;
  this.email = email;
  this.password = password;
};

// Class declaration for Service
Service = function(username, userId, serviceName, cost){

  this.kind = "service";
  this.username = username;
  this.userId = userId;
  this.service = serviceName;
  this.cost = parseFloat(cost);

  create = new Date();
  bill = new Date(create);
  bill.setMonth(create.getMonth() + 1);

  this.dateCreated = create;
  this.billingDate = bill;

};

// Class declaration for Package
BobaPackage = function(username, userId, packageName, cost){

  this.kind = "package";
  this.username = username;
  this.userId = userId;
  this.package = packageName;
  this.packageList = PackageTypes.find({package: packageName}).fetch()[0].serviceList;
  this.cost = parseFloat(cost);

  create = new Date();
  bill = new Date(create);
  bill.setMonth(create.getMonth() + 1);

  this.dateCreated = create;
  this.billingDate = bill;

}

//ServiceType Class
ServiceType = function(serviceName, cost, adminService){

  this.service = serviceName;     // Service name
  this.cost = cost;               // Service cost
  this.adminOnly = adminService;  // Whether this service can only be seen
                                  // by the admins or not.
};

//PackageType Class
PackageType = function(packageName, services, cost, adminPackage){

  this.package = packageName;     // Package name
  this.serviceList = services     // List of ServiceTypes included in package
  this.cost = cost;               // Package cost
  this.adminOnly = adminPackage;  // Whether this service can only be seen
                                  // by the admins or not.
};
