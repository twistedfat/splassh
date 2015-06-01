Template.project.helpers({
   comments: function() {
       return Comments.find({projectId: this._id}, {sort: {posted: -1}});
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
//TODO

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

//Returns time in a format like: 4 minutes ago.
//NOTE: The context (this) is a comment model.
Template.project.posted_timeago = function() {
    return moment(this.posted).fromNow();
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
//TODO

Template.project.maintag = function() {
  return (typeof this.tags !== 'undefined') ? this.tags[0] : 'none';
}
Template.project.rendered = function() {
  $('#project .primary-tag').tooltip();
}

Template.project.events({
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

	'submit form.form-adddata': function(e, t) {
 e.preventDefault();
        var content = $('#field1').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
        var content = $('#field2').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
        var content = $('#field3').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
        var content = $('#field4').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
        var content = $('#field5').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
        var content = $('#value1').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
        var content = $('#value2').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
        var content = $('#value3').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }        
	var content = $('#value4').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
        var content = $('#value5').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
	var content = $('#equip1').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
	var content = $('#equip2').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
	var content = $('#equip3').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
	var content = $('#equip4').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }
	var content = $('#equip5').val();
        content = content.trim();
      
        if (!content || content === "") {
          toastr.warning("Unable to post: empty field.");
          return;
        }

 	if (!Meteor.user()){
          toastr.warning("Please sign in");
          return;
        }
        
	var dataset = {
	  
          owner:  SPLASSH.userName(Meteor.user()),
          avatarUrl: Gravatar.imageUrl(SPLASSH.userEmail(Meteor.user())),
	type:"text",
        pH: $('#value1').val(),
	dissolvedOxygen: $('#value2').val(),
	nitrates : $('#value3').val(),
	phosphates: $('#value4').val(),
	temperature: $('#value5').val(),
	pHEquip: $('#equip1').val(),
	dissolvedOxygenEquip: $('#equip2').val(),
	nitratesEquip: $('#equip3').val(),
	phosphatesEquip: $('#equip4').val(),
	temperatureEquip: $('#equip5').val()
        };

        //Add comment will automatically set comment.posted to the current time.
        addDataset(dataset, this);
        
            // clear input field
        $('#value1').val(function() {
          return this.defaultValue;
        })

},


  'click .followProject': function (e,t ) {
    e.preventDefault();
 var follow = {
          user:  SPLASSH.userName(Meteor.user()),
          projectId: this._id
        };
    Follows.insert(follow);
  },
  'click .remove': function (e,t ) {
    e.preventDefault();
    Comments.remove(this._id);
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
'click .editData': function (e,t ) {
    e.preventDefault();
    var ele = document.getElementById("datasetform");
	var text = document.getElementById("editData");	
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
          author:  SPLASSH.userName(Meteor.user()),
          avatarUrl: Gravatar.imageUrl(SPLASSH.userEmail(Meteor.user())),
          body: $('#project-edit').val()
        };

        //Add comment will automatically set comment.posted to the current time.
        editComment(comment, this);
        
        // clear input field
        $('#project-edit').val(function() {
          return this.defaultValue;
        })
    }
  
 
})
