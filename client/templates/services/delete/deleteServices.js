//Note: we already subscribed to services in viewServices.js

Template.viewServices.events({
  'click .btn-delete': function(event, template){

      var id = event.currentTarget.value;

      var services = Services.findOne({_id: id});
      var bpackages = BobaPackages.findOne({_id: id});

      if(services == undefined){
        BobaPackages.remove({_id: id});
        Meteor.call('updatePayment', Meteor.user()._id, -bpackages.cost);
        Meteor.call('addPenalty', Meteor.user()._id, id, "Package");
      }
      else{
        Services.remove({_id: id});
        Meteor.call('updatePayment', Meteor.user()._id, -services.cost);
        Meteor.call('addPenalty', Meteor.user()._id, id, "Service");
      }

      Meteor.call('updatePayment', Meteor.user()._id, 150);

  }
});
