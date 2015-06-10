// controller for userdash, and any subsequent dashes
Template.userdash.helpers({
projects : function() {
  return Projects.find({ 'owner' : SPLASSH.userName(Meteor.user()) }, { sort : { 'date_created': -1 }});
},

comments : function(){
 return Comments.find({ 'author' : SPLASSH.userName(Meteor.user()) }, { sort : { 'posted' : -1 }});
},

follows : function(){
 return Follows.find({ 'userId' : Meteor.user()._id}, { sort : { 'posted' : -1 }});
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
  'click .removeProject': function (e,t ) {
    e.preventDefault();
    Projects.remove(this._id);
  },
  'click': function () {
        Session.set("selected", this._id);
  }, 'click .removeComment': function (e,t) {
	e.preventDefault();
    Comments.remove(this._id);
},'click .editProject': function(e,t){
	e.preventDefault();
	Session.set('projectId', this._id);
}, 'click .removeFollow': function (e,t) {
	e.preventDefault();
    Follows.remove(this._id);
},
  'click .editComment': function (e,t ) {
    e.preventDefault();
    var ele = document.getElementById("editCommentform");
	var text = document.getElementById("edit");	
        if(ele.style.display == "block") {
    		ele.style.display = "none";		
  	}
	else {
		ele.style.display = "block";		
	}
  },

 'submit form.editcomment': function(e, t) {
        e.preventDefault();
        var content = $('#comment-edit').val();
        content = content.trim();
      
        if (!Meteor.user()){
          toastr.warning("Please sign in to leave a comment.");
          return;
        }
        if (!content || content === "") {
          toastr.warning("Unable to post an empty comment.");
          return;
        }

        var comment = {
	  _id: this._id,
          author:  SPLASSH.userName(Meteor.user()),
          avatarUrl: Gravatar.imageUrl(SPLASSH.userEmail(Meteor.user())),
          body: $('#comment-edit').val(),
	  projectId : this.projectId
        };

        //Add comment will automatically set comment.posted to the current time.
        editComment(comment);
        
        // clear input field
        $('#comment-edit').val(function() {
          return this.defaultValue;
        })
    }


});

