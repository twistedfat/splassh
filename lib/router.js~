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
  waitOn: function() {  Meteor.subscribe('images'); Meteor.subscribe('projects'); Meteor.subscribe('tags'); Meteor.subscribe('follows'); Meteor.subscribe('comments');Meteor.subscribe('datasets');},
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
    onRun : function() { AmplifiedSession.set('currentProjectId', this.params._id); },
    waitOn: function() { Meteor.subscribe('projects'); Meteor.subscribe('comments');  Meteor.subscribe('follows');},
    data: function() { 
      return Projects.findOne(this.params._id);
    }
    
  });
  this.route('tagsList', {
    path : '/tags'
  });
  this.route('projectsByTag', {
    path : '/projects/tag/:_tag'
  });
  this.route('projectList', {
    path : '/projectList'
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

  this.route('dataEntry', {
    path: '/dataEntry'
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
