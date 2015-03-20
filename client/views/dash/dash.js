/*
Template.dash.helpers({

notification: function(followId){
// Keep track of how many administrators are online.

var query = Projects.find({_id: followId});
var handle = query.observeChanges({
  added: function (id, project) {
	
  },
  changed: function(id, fields){
	 
},
  removed: function () {
   
  }
});

// After five seconds, stop keeping the count.
setTimeout(function () {handle.stop();}, 5000);
}
});
*/
// controller for userdash, and any subsequent dashes
Template.userdash.projects = function() {
  return Projects.find({ 'owner' : SPLASSH.userName(Meteor.user()) }, { sort : { 'date_created': -1 }});
};

Template.userdash.comments = function(){
 return Comments.find({ 'author' : SPLASSH.userName(Meteor.user()) }, { sort : { 'posted' : -1 }});
};


Template.userdash.follows = function(){
 return Follows.find({ 'user' : SPLASSH.userName(Meteor.user()) }, { sort : { 'posted' : -1 }});
};

Template.userdash.userName = function() {
   return SPLASSH.userName(Meteor.user()); //.emails[0].address;
};

Template.userdash.maintag = function() {
  var me = this, tag = me.tags[0];
  console.log(me);
  return (typeof tag !== 'undefined') ? tag : 'unknown';
}

// When the remove button is clicked on a project listing, delete
// that project.
Template.userdash.events({
  'click .remove': function (e,t ) {
    e.preventDefault();
    Projects.remove(this._id);
  },
  'click': function () {
    Session.set("selected_project", this._id);
  }

});
