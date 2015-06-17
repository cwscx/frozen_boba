ServiceFactory = {
  addService: function (serviceObj){
    return Services.insert(serviceObj);
  },

  deleteService: function(serviceId){
    Services.remove({_id: serviceId}, function(err){
      if(err){
        return false;
      }
    });

    return true;
  },

  getUserServices: function (userId){
    return Services.find({userId: userId});
  },
};

PackageFactory = {
  addPackage: function (packageObj){
    return BobaPackages.insert(packageObj);
  },

  deletePackage: function(packageId){
    BobaPackages.remove({_id: packageIdId}, function(err){
      if(err){
        return false;
      }
    });

    return true;
  },

  getUserPackages: function (userId){
    return BobaPackages.find({userId: userId});
  },

}

UserFactory = {
  addUser: function(userObj){

    id = Accounts.createUser({
            username: userObj.username,
            email: userObj.email,
            password: userObj.password,
          });

    return id;

  },

  listUsers: function(){
    return Users.find();
  },
};
