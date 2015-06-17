var ERRORS_KEY = "loginErrors"

//This will create a session mapping the errors to an empty object, which will
//store the login errors
Template.login.created = function() {
  Session.set(ERRORS_KEY, {});
};

Template.login.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  }
});

Template.login.events({
  'submit': function(event, template){

    // Get the email and password from the login template
    var credential = template.$('[name=credential]').val();
    var password = template.$('[name=password]').val();

    var errors = {};

    if (! credential) {
      errors.email = 'Username or Email is required';
    }

    if (! password) {
      errors.password = 'Password is required';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return false; // Return false to prevent a browser refresh!
    }

    Meteor.loginWithPassword(credential, password, function(error) {
      if (error) {
        Session.set(ERRORS_KEY, {'none': 'Incorrect username or password'});
        return false;
      }

      if(Roles.userIsInRole(Meteor.user(), 'admin')){
        Router.go('/admin/control');
      }
      else if(Roles.userIsInRole(Meteor.user(), 'marketing_rep')){
        Router.go('/marketing/control');
      }
      else if(Roles.userIsInRole(Meteor.user(), 'customer_service')){
        Router.go('/service/control');
      }
      else{
        var username = Meteor.user().username;
        Router.go('/' + username + '/dashboard');
      }

    });

    return false;

  }

});

Template.loginStatus.events({
  'submit #logout-form': function(event, template){

    Meteor.logout();
    Router.go('home');
    return false;

  }

});

Template.loginStatus.helpers({
  thresholdNotification: function() {
    var threshold = Thresholds.findOne({userId: Meteor.user()._id}).threshold;
    var payment = Payments.findOne({userId: Meteor.user()._id}).bill;

    return RuleObject.checkThresholdRule({

      payment: payment,
      threshold: threshold,

    });
  }
});
