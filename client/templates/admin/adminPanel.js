Meteor.subscribe('users');
Meteor.subscribe('userServiceData');
Meteor.subscribe('userPackageData');
Meteor.subscribe('stypes');
Meteor.subscribe('ptypes');

Template.controlMarketing.helpers({
  'availableUserServices' : function(){
    Meteor.subscribe('stypes');
    return ServiceTypes.find();
  },

  'availableUserPackages' : function(){
    Meteor.subscribe('ptypes');
    return PackageTypes.find();
  }
});

Template.controlMarketing.events({
  'click .create-service': function(event, template){
    var serviceName = template.$('[id=serviceName]').val();
    var serviceCost = template.$('[id=serviceCost]').val();
    var adminOnly = template.$('[name=adminOnlyService]').is(":checked");

    Meteor.call('createServiceType', serviceName, parseFloat(serviceCost), adminOnly);
  },
  'click .create-package': function(event, template){
    var packageName = template.$('[id=packageName]').val();
    var packageCost = template.$('[id=packageCost]').val();
    var adminOnly = template.$('[name=adminOnlyPackage]').is(":checked");

    var desiredTotal = [];

    // Create arrays of desired services and packages from checkboxes
    // using JQuery
    var desiredServices = template.$('[name=serviceCheck]:checked').map(function(){
      return $(this).val();
    }).get();

    var desiredPackages = template.$('[name=packageCheck]:checked').map(function(){
      return $(this).val();
    }).get();

    desiredPackages.forEach(function(entry){
      desiredTotal = desiredTotal.concat(PackageTypes.findOne({package: entry}).packageList);
    });

    desiredTotal = desiredTotal.concat(desiredServices);
    desiredTotal = _.uniq(desiredTotal, false);
    desiredTotal = _.filter(desiredTotal, function(string){return string !== undefined});

    Meteor.call('createPackageType', packageName, desiredTotal, parseFloat(packageCost), adminOnly);
  }
});

Template.controlService.helpers({
  'userList': function (){
    Meteor.subscribe('users')
    return Users.find();
  },
  'userServices': function (){
    Meteor.subscribe('userServiceData');
    return Services.find({userId: Session.get("idKey")});
  },
  'userPackages': function(){
    Meteor.subscribe('userPackageData');
    return BobaPackages.find({userId: Session.get("idKey")});
  },
  'availableUserServices' : function(){
    Meteor.subscribe('stypes');
    return ServiceTypes.find();
  },

  'availableUserPackages' : function(){
    Meteor.subscribe('ptypes');
    return PackageTypes.find();
  }
});

Template.controlService.events({
  'click .btn-manage': function(event, template){

    var userId = event.currentTarget.value;
    var username = event.currentTarget.name;

    Session.set("idKey", userId);
    Session.set("userKey", username);

  },

  'click .btn-delete': function(event, template){

      var id = event.currentTarget.value;

      var services = Services.findOne({_id: id});
      var bpackages = BobaPackages.findOne({_id: id});

      if(services == undefined){
        BobaPackages.remove({_id: id});
        Meteor.call('updatePayment', Session.get("idKey"), -bpackages.cost);
      }
      else{
        Services.remove({_id: id});
        Meteor.call('updatePayment', Session.get("idKey"), -services.cost);
      }
  },

  'click .btn-service' : function (event, template) {

    var serviceCost = ServiceTypes.find({service: event.currentTarget.name}).fetch()[0].cost;
    Meteor.call('updatePayment', Session.get("idKey"), serviceCost);

    console.log(event.currentTarget.name);

    Meteor.call(
      'createUserServices',
      Session.get("userKey"),
      Session.get("idKey"),
      event.currentTarget.name,
      serviceCost
    );
  },

  'click .btn-package' : function (event, template){

    var packageCost = PackageTypes.find({package: event.currentTarget.name}).fetch()[0].cost;
    Meteor.call('updatePayment', Session.get("idKey"), packageCost);

    Meteor.call('createUserPackages',
      Session.get("userKey"),
      Session.get("idKey"),
      event.currentTarget.name,
      packageCost
    );

  }
});
