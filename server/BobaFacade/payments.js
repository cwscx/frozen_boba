Meteor.methods({
  addPayment: function(userId){
    if(userId == null) throw new Meteor.Error(422, 'No user logged in');

    Payments.insert(new Payment(userId));
  },
  updatePayment: function(userId, cost){
    if(this.userId == null) throw new Meteor.Error(422, 'No user logged in');
    Payments.update({userId: userId}, {$inc: {bill: cost}});
  }
});
