//This file creates all the "routes" to the webpages.
//Each "this.route()" creates a new path

Router.map(function() {

  this.route('register');
  this.route('login');
  this.route('registerSuccess', {
    path: '/register/success'
  });

  this.route('dashboard', {
    path: '/:username/dashboard',
  });

  this.route('home', {
    path: '/'
  });

  this.route('addServices', {
    path: '/dashboard/addServices'
  });

  this.route('questions', {
    path: '/dashboard/questions'
  });

  this.route('deleteServices', {
  	path: '/dashboard/deleteServices'
	});

  this.route('viewServices', {
    path: '/dashboard/viewServices'
  });

  // Restrict the admin page to admins only
  this.route('controlService', {
    path: '/service/control',
  });

  this.route('controlMarketing', {
    path: '/marketing/control',
  });

});
