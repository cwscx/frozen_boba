Meteor.methods({
  addPenalty: function(userId, penaltyId, penaltyName){
    if(userId == null) throw new Meteor.Error(422, 'No user logged in');

    Penalties.insert(new Penalty(userId, penaltyId, penaltyName));
  },
});
