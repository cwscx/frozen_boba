Meteor.publish('thresholds', function () {
  var userId = this.userId;
  return Thresholds.find({userId: userId});
});

Meteor.publish('services', function () {
  var userId = this.userId;
  return Services.find({userId: userId});
});

Meteor.publish('packages', function(){
  var userId = this.userId;
  return BobaPackages.find({userId: userId});
});

Meteor.publish('stypes', function () {
  return ServiceTypes.find();
});

Meteor.publish('ptypes', function () {
  var admin = false;
  return PackageTypes.find();
});

Meteor.publish('penalties', function () {
  var userId = this.userId;
  return Penalties.find({userId: userId});
});

Meteor.publish('payments', function () {
  var userId = this.userId;
  return Payments.find({userId: userId});
});

// The following publications are admin only.

Meteor.publish('users', function () {

  if(Roles.userIsInRole(this.userId, ['admin', 'customer_service', 'marketing_rep']))
    return Users.find({roles: ["customer"]});
  else {
    this.error(new Meteor.Error(401, "Unauthorized access"));
    return;
  }

});

Meteor.publish('userServiceData', function () {
  if(Roles.userIsInRole(this.userId, ['admin', 'customer_service', 'marketing_rep']))
    return Services.find();
  else {
    this.error(new Meteor.Error(401, "Unauthorized access"));
    return;
  }
});

Meteor.publish('userPackageData', function () {
  if(Roles.userIsInRole(this.userId, ['admin', 'customer_service', 'marketing_rep']))
    return BobaPackages.find();
  else {
    this.error(new Meteor.Error(401, "Unauthorized access"));
    return;
  }
});
