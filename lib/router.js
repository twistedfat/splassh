// Anything you put inside the /lib folder is gauranteed to load first
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  yieldTemplates: {
    'navbar': { to : 'navbar' },
    'loginbar': { to : 'loginbar' },
    'footer': { to : 'footer' }
  },
  trackPageView: true,  // Google Analytics
  waitOn: function() { Meteor.subscribe('users');Meteor.subscribe('projects'); Meteor.subscribe('tags'); Meteor.subscribe('follows'); Meteor.subscribe('comments');Meteor.subscribe('sites');Meteor.subscribe("images"); Meteor.subscribe("files");Meteor.subscribe('notifications');Meteor.subscribe('teams');Meteor.subscribe('waters');Meteor.subscribe('weathers');Meteor.subscribe('chemicals');Meteor.subscribe('physicals');Meteor.subscribe('biologicals');Meteor.subscribe('links');}
//per all route?
});

Router.map(function() {
  this.route('home', {
    path : '/',
    waitOn: function() { Meteor.subscribe('users'); Meteor.subscribe('comments'); }
   });
  this.route('map', {
    path : '/map',
    layoutTemplate: 'nofooter'
  });
  this.route('sponsors', {
    path : '/sponsors'
    
  });
   this.route('contact', {
    path : '/contact'
    
  });
  this.route('project', {
    path : '/project/:_id',
    onRun : function() { Session.setAuth( 'currentProjectId', this.params._id); },
    waitOn: function() { Meteor.subscribe('projects'); Meteor.subscribe('comments');  Meteor.subscribe('follows');Meteor.subscribe("images");},
    data: function() {
      return Projects.findOne(this.params._id);
    }
    
  });
  this.route('tagsList', {
    path : '/tags',
	waitOn: function() { Meteor.subscribe('tags'); }
  });
  this.route('projectsByTag', {
//needs to be fuxed
    path : '/projects/tag/:_tag',
	waitOn: function() { Meteor.subscribe('projects'); }
  });
  this.route('projectList', {
    path : '/projectList',
	waitOn: function() { Meteor.subscribe('projects');}
  });
  this.route('userdash', {
    path: '/mydash'
  });
  this.route('team', {
    path: '/team'
  });
this.route('mailingList', {
    path: '/mailingList'
  });
  this.route('searchf', {
    path: '/searchf'
  });
this.route('images', {
    path: '/images',
	waitOn: function() { Meteor.subscribe('images');},
	
  });
this.route('viewImages', {
    path: '/viewImages',
	waitOn: function() { Meteor.subscribe('images');},
	
  });
this.route('dataEntry', {
    path: '/dataEntry',
	waitOn: function() {Meteor.subscribe('datasets');},
  });
this.route('viewData', {
    path: '/viewData',
	waitOn: function() {},
  });
this.route('attachments', {
  path: '/attachments',
  waitOn: function() { Meteor.subscribe('files');}
});
this.route('donate', {
    path: '/donate'
  });

 this.route('allProjects', {
    path : '/allProjects',
	waitOn: function() { Meteor.subscribe('projects');}
  });

this.route('about', {
    path: '/about'
  });
  //this.route('singlePageLogin', { path: '/login' });
  //this.route('singlePageSignUp', { path: '/signup'});
  //this.route('singlePageForgotPassword', { path: '/forgot-password' });
});

/*
var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render('loading');
    } else {
      this.render('accessDenied');
     // setTimeout(function() {
      //  toastr.info('Please sign in to use the site.');
     // }, 500);
//      Router.go('/login');        
    }

  }
}
Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, { only: ['userdash'] });
*/
Router.onBeforeAction(function() { toastr.clear(); });
