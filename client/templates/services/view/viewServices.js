Meteor.subscribe('services');
Meteor.subscribe('packages');
Meteor.subscribe('payments');
Meteor.subscribe('penalties');

Template.viewServices.helpers({
  'userServices' : function(){
    return Services.find({}, {sort: {username: -1}});
  },

  'userPackages' : function(){
    return BobaPackages.find({}, {sort: {username: -1}});
  },

  'userPayments' : function(){
    return Payments.findOne({userId: Meteor.user()._id});
  },
  'userPenalties' : function(){
    return Penalties.find();
  }
});
