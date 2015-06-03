// controller for userdash, and any subsequent dashes
Template.userdash.helpers({
projects : function() {
  return Projects.find({ 'owner' : SPLASSH.userName(Meteor.user()) }, { sort : { 'date_created': -1 }});
},

comments : function(){
 return Comments.find({ 'author' : SPLASSH.userName(Meteor.user()) }, { sort : { 'posted' : -1 }});
},

follows : function(){
 return Follows.find({ 'user' : SPLASSH.userName(Meteor.user()) }, { sort : { 'posted' : -1 }});
},

userName : function() {
   return SPLASSH.userName(Meteor.user()); //.emails[0].address;
},

maintag : function() {
  var me = this, tag = me.tags[0];
  console.log(me);
  return (typeof tag !== 'undefined') ? tag : 'unknown';
}
});

// When the remove button is clicked on a project listing, delete
// that project.
Template.userdash.events({
  'click .remove': function (e,t ) {
    e.preventDefault();
    Projects.remove(this._id);
  },
  'click': function () {
        Session.set("selected", this._id);
  }, 'click .removecom': function (e,t) {
	e.preventDefault();
    Comments.remove(this._id);
},'click .edit': function(e,t){
	//TODO
}

});
