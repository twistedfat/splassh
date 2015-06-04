Template.project.helpers({
   comments: function() {
       return Comments.find({projectId: this._id}, {sort: {posted: -1}});
   },
    follows : function(){
        return Follows.find({$and: [{'userId' : Meteor.user()._id}, {projectId: this._id }] }, { sort : { 'posted' : -1 }});
   },
  isCommentOwner: function(){
	return this.author === SPLASSH.userName(Meteor.user()) ;
	},
  isProjectOwner: function(){
	return this.owner === SPLASSH.userName(Meteor.user()) ;
	},
  datasets: function() {
       return Datasets.find({projectId: this._id, type:"text"});
   },
  images: function() {
       return Datasets.find({projectId: this._id, type:"image"});
   },
  isProjectAuthor: function(){
	return ( this.authors.indexOf(SPLASSH.userName(Meteor.user()))>-1 || this.owner === SPLASSH.userName(Meteor.user()) );
   },
maintag : function() {
  return (typeof this.tags !== 'undefined') ? this.tags[0] : 'none';
},
isFollowed: function(){
	return (Follows.findOne({ $and: [{'userId' : Meteor.user()._id}, {projectId: this._id }]}));
//Follows.find({projectId: this._id}, {_id: 1}).limit(1)
	},

//Returns time in a format like: 4 minutes ago.
//NOTE: The context (this) is a comment model.
posted_timeago : function() {
    return moment(this.posted).fromNow();
}
});

Template.projectsByTag.projects = function() {
    var tag = Router.current().params._tag;
    var arr = [];
    arr.push(tag);
   return Projects.find({ tags : { $in : arr } }, {sort: { date_created: -1} });
}

Template.projectsByTag.helpers({
  mainTag : function() {
    return Router.current().params._tag;
  }
});

Template.projectList.helpers({
	projects : function() {
  return Projects.find({},{ sort: { date_created: -1 }});
}
});

Template.projectList.rendered = function() {
  
  var container = document.querySelector('#masonry-container');
  var msnry = new Masonry( container, {
    // options
    //columnWidth: ".grid-sizer",
    gutter: 10,
    itemSelector: ".item",
    isFitWidth: true
  });
  
  /* todo: allows for https:// - make changes on dev here
  var $container = $('#masonry-container');
  // initialize
  $container.masonry({
    columnWidth: 60,
    gutter: 10,
    itemSelector: '.item',
    isFitWidth: true
  });
  */
}
Template.project.created = function() {
    // Sort comments in descending order by date posted. It also convert posted
    // to a string so that it will look write in the template.
 
    this.comments = _.sortBy(this.comments, function(comment) {
        return -1*comment.posted;
    });

    this.commentsText = _.map(this.comments, function(comment) {
        //var dateObject = new Date(comment.posted);
        comment.posted = moment(comment.posted).fromNow();
        return comment;
    });
}

Template.project.rendered = function() {
  $('#project .primary-tag').tooltip();
}

Template.project.events({

  'click': function () {
        Session.set('selected', this._id);
  },
    'submit form.form-addcomment': function(e, t) {
        e.preventDefault();
        var content = $('#project-comment').val();
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
          author:  SPLASSH.userName(Meteor.user()),
          avatarUrl: Gravatar.imageUrl(SPLASSH.userEmail(Meteor.user())),
          body: $('#project-comment').val()
        };

        //Add comment will automatically set comment.posted to the current time.
       addComment(comment, this);
        
        // clear input field
        $('#project-comment').val(function() {
          return this.defaultValue;
        })
    },
'submit form.form-addauthor': function(e, t) {
        e.preventDefault();
        var content = $('#author').val();
        content = content.trim();
      
        if (!Meteor.user()){
          toastr.warning("Please sign in to leave a comment.");
          return;
        }
        if (!content || content === "") {
          toastr.warning("Please enter a username");
          return;
        }


        //Add comment will automatically set comment.posted to the current time.
        addAuthor(content, this);
        
        // clear input field
        $('#author').val(function() {
          return this.defaultValue;
        })
    },
  'click .remove': function (e,t ) {
    e.preventDefault();
    Comments.remove(this._id);
  },
  'click .followProject': function (e,t ) {
    e.preventDefault();
	addFollow(this);
},
  'click .unfollowProject': function (e,t ) {
    e.preventDefault();
//	Follows.remove({$and:[{userId: Meteor.userId() }, {projectId: this._id} ]});
Follows.remove(this._id);
},
  'click .edit': function (e,t ) {
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

 'submit form.form-editcomment': function(e, t) {
        e.preventDefault();
        var content = $('#project-edit').val();
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
	  _id: Session.get('selected'),
          author:  SPLASSH.userName(Meteor.user()),
          avatarUrl: Gravatar.imageUrl(SPLASSH.userEmail(Meteor.user())),
          body: $('#project-edit').val(),
	  projectId : this._id
        };

        //Add comment will automatically set comment.posted to the current time.
        editComment(comment);
        
        // clear input field
        $('#project-edit').val(function() {
          return this.defaultValue;
        })
    }

})

// PROJECT TAGS
Template.projectTags.helpers({
rendered : function() {
  // Applying tooltips
  $('.project-tags button').tooltip();
},
tags : function() {
  var project = this, tags = project.tags;
  if (typeof tags !== 'undefined' && tags !== null) {
    return Tags.find({ 'name' : { $ne : project.tags[0] } },  { _id: -1 }, { sort : {tier:-1 , number : 1}}); // everything but the db id
  }
  return;
},
tagSelected : function() {
  $('.project-tags button').tooltip();
  var me = this;
  var projectId = AmplifiedSession.get('currentProjectId') || null;
  var project = Projects.findOne({ _id: projectId });
  var tags = project.tags;
  
  return ( _.indexOf(tags, me.name) !== -1);
}
});
Template.projectTags.events({
  'click button': function(e) {
    e.preventDefault();
    
    // check permissions
    var pid = Router.current().params._id;
    var proj = Projects.findOne({ _id: pid});
    var owner = proj.owner;

    if (typeof owner !== 'undefined' && owner !== null && SPLASSH.userName(Meteor.user()) === owner) {
      var elem = $(e.target);
      elem.toggleClass('btn-success');
      if (elem.hasClass('btn-success')) {
        Projects.update( AmplifiedSession.get('currentProjectId'), { $push : { tags : this.name } } ); 
      } else {
        Projects.update( AmplifiedSession.get('currentProjectId'), { $pull : { tags : this.name } } );   
      }
    } else {
      toastr.info('This action limited to project owner, and logged in.');
    }
  }
});
