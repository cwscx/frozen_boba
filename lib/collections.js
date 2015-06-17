//ServiceType collection. Contains all of the Service types
//(like internet, wireless, etc)
ServiceTypes = new Meteor.Collection('stypes');

//PackageType collection. Contains all of the Package types,
//which are a mix and match collection of the Service Types
PackageTypes = new Meteor.Collection("ptypes");

//Service collection. Contains all of the individual services.
Services = new Meteor.Collection("services");

//Packages collection. Contains all of the packages.
BobaPackages = new Meteor.Collection("packages");

//Payments collection. Contains all of the user payments.
Payments = new Meteor.Collection("payments");

//Threshold collection. Will contain the unique threshold the customer sets.
Thresholds = new Meteor.Collection("thresholds");

//Penalty collection. Will contain the penalties the customer has accumulated
Penalties = new Meteor.Collection("penalties");

// Creates a reference to existing Meteor user collection
Users = Meteor.users;
