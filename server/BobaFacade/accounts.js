Meteor.methods({

  createCustomer: function (data){

    if (!data.username || !data.password || !data.email) {
      throw new Meteor.Error(422, 'Please fill in all fields.');
    }

    if(!passwordCheck(data.password, data.repassword)){
      throw new Meteor.Error(422, 'Passwords are unidentical.');
    }

    var userId =  Accounts.createUser({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    profile: {
                      totalBill: 0,
                    }});

    // Set the role of a newly created customer
    Roles.addUsersToRoles(userId, ['customer']);

    Meteor.call('addPayment', userId);
    console.log("Payment method added for " + userId + "!");

    Meteor.call('addThreshold', userId);
    console.log("Threshold for " + userId + " added!");

    return userId;

  },

});

function passwordCheck(password, repassword){

  if(password.localeCompare(repassword) == 0){
    return true;
  }
  else{
    return false;
  }
}
