Meteor.methods({
  addThreshold: function(userId){

    if(userId == null) throw new Meteor.Error(422, 'No user logged in');

    Thresholds.insert(new Threshold(userId));

  },
  updateThreshold: function(userId, thresh){

    if(this.userId == null) throw new Meteor.Error(422, 'No user logged in');

    Thresholds.update({userId: userId}, {$set: {threshold: thresh}});

  }
});
