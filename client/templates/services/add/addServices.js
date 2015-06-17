USER_KEY = "userKey"

Meteor.subscribe('stypes');
Meteor.subscribe('ptypes');

Template.addServices.helpers({
  'availableUserServices' : function(){
    return ServiceTypes.find({adminOnly: false});
  },

  'availableUserPackages' : function(){
    return PackageTypes.find({adminOnly: false});
  }
});

Template.addServices.events({
  'click .button-service' : function (event, template) {
    var userId = Session.get(USER_KEY);
    var isAdmin = false;

    if(Roles.userIsInRole(Meteor.userId(), 'admin')){
      isAdmin = true;
    }

    var serviceCost = ServiceTypes.find({service: event.currentTarget.name}).fetch()[0].cost;

    console.log("The service cost is: " + serviceCost);

    Meteor.call('updatePayment', Meteor.user()._id, serviceCost);

    Meteor.call(
      'createUserServices',
      Meteor.user().username,
      Meteor.userId(),
      event.currentTarget.name,
      serviceCost
    );
  },

  'click .button-package' : function (event, template){

    var packageCost = PackageTypes.find({package: event.currentTarget.name}).fetch()[0].cost;

    console.log("The service cost is: " + packageCost);

    Meteor.call('updatePayment', Meteor.user()._id, packageCost);

    Meteor.call('createUserPackages',
      Meteor.user().username,
      Meteor.userId(),
      event.currentTarget.name,
      packageCost
    );

  }
});
