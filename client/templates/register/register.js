var ERRORS_KEY = "loginErrors"
var CUSTOMER_KEY = "customerKey"

//This will create a session mapping the errors to an empty object, which will
//store the login errors
Template.register.created = function() {
  Session.set(ERRORS_KEY, {});
  Session.set(CUSTOMER_KEY, {'type': "retail"});
};

Template.register.helpers({

  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },

  customer: function() {
    return Session.get(CUSTOMER_KEY).type;
  }

});

Template.register.events({
  'submit': function(event, template){

    // Get the email and password from the login template
    var username = template.$('[name=username]').val();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var repassword = template.$('[name=repassword]').val();

    Meteor.call("createCustomer", {
      username: username,
      email: email,
      password: password,
      repassword: repassword,
      }, function (error, result){

        if(error){
          console.log(error);
          Session.set(ERRORS_KEY, {'none': error.reason});
        }
        else{
          Router.go('registerSuccess');
        }

    });

    // Return false to prevent a browser refresh
    return false;

  },

  'click .customerType': function(event, template){
    Session.set(CUSTOMER_KEY, {'type': event.currentTarget.value});

  }

});
