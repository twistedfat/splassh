/*
  Schema:
  comment { _id, projectId, author, posted, body, public, gravatarHash }
*/

/* Primary data collection */
Comments = new Meteor.Collection("comments");

Comments.initEasySearch(['author', 'body'], {
   'limit' : 20,
    'use' : 'minimongo'
});

//Allow anything in the database to be modified without a Meteor.call
Comments.allow({
  insert: function (userId, tag) {
      return true;
  },
  update: function (userId, tag, fields, modifier) {
    return true;
  },
  remove: function (userId, tag) {
    return true;
  }
});

/**
* Adds comment to the comments of project and saves it to the Comments collection.

* @method addCommentToProject
* @param {Object} comment The comment. It must have the fields: author and body.
* posted field is optional. If it is not included, the current time will be used.
* @param {Object} project The project. Must adhere to the Project schema. To
* test that, use the isProjectValid function.
*/

// should probably add this to another file in the global scope, such as lib/globals.js or something
addComment = function(comment, projectId) {
    //If no time is associated with the comment, add the current time.
    if (typeof comment.posted === 'undefined') {
        var date = new Date();
        comment.posted = date.getTime();
    }
    //Set the comment's foreign key to project.
    comment.projectId = projectId;
	comment._id = Comments.insert(comment);
	createCommentNotification(comment);
	//subscribe commenter to receive future comment notifications
	addFollower(comment.authorId,projectId);
	//createComment for comment.projectId.Followers
}

editComment = function(comment) {
    //If no time is associated with the comment, add the current time.
   
        var date = new Date();
        editTime= date.getTime();
    
    //Set the comment's foreign key to project.
  
    Comments.update( {_id : comment._id}, {$set:{body:comment.body, edited:editTime} } );
}

