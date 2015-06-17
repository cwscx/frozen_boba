Meteor.subscribe('thresholds');

Template.dashboard.helpers({
  'userPayments' : function(){
    return Payments.findOne({userId: Meteor.user()._id});
  },

  'userThresholds' : function(){
    return Thresholds.findOne({userId: Meteor.user()._id});
  },
  
  'thresholdPassed' : function(){
    var threshold = Thresholds.findOne({userId: Meteor.user()._id}).threshold;
    var payment = Payments.findOne({userId: Meteor.user()._id}).bill;

    return payment > threshold;
  }
});

Template.dashboard.events({
  'click .update-threshold' : function(event, template){

    var thresholdValue = template.$('[id=updateThreshold]').val();
    Meteor.call("updateThreshold", Meteor.user()._id, parseFloat(thresholdValue));

  }
})
