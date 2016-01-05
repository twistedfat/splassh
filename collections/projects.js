/* Primary data collection */
Projects = new Meteor.Collection("projects");

/* Collection prototype 
 * _id, public, owner
 * info { title, description, tags, coordinates }
 * log { created, updated, deleted, published }
 * comments { _id, author, posted, body, public }
 */
// Extended configuration
Projects.initEasySearch(['title', 'description', 'tags'], {
    'limit' : 20,
    'use' : 'minimongo'
});


Projects.allow({
  insert: function (userId, project) {
    return !! userId; // no cowboy inserts -- use createProject method
  },
  update: function (userId, project, fields, modifier) {
    return true;
  },
  remove: function (userId, project) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Meteor.methods({
  // options should include: title, description, coordinates, public, tags
  createProject: function (options) {
    check(options, {
      title: String,
	  waterbody: String,
      description: String,
      coordinates: Object,
      tags: String,
	  water: String,
	  cover:String,
    attachments: [String]
    });
    
    var tagArray = [];
    tagArray.push(options.tags);
    
    if (options.title.length > 100)
      throw new Meteor.Error(413, "Title too long");
    if (options.description.length > 1000)
      throw new Meteor.Error(413, "Description too long");
   
	var userIdArray = [];
    userIdArray.push(Meteor.user()._id);
	var usernameArray = [];
    usernameArray.push(SPLASSH.userName(Meteor.user()));
   var id = Projects.insert({
      coordinates: {
          lat: options.coordinates.lat,
          lng: options.coordinates.lng
      },
      title: options.title,
	  waterbody: options.waterbody,
      description: options.description,
      tags: tagArray,
      water: options.water,
      owner: SPLASSH.userName(Meteor.user()),
	  ownerId: Meteor.user()._id,
      avatarUrl: Gravatar.imageUrl(SPLASSH.userEmail(Meteor.user())),
      date_created: new Date().getTime(),
	  modified: new Date().getTime(),
	  authors:usernameArray,
	  authorIds:userIdArray,
	  cover: options.cover,
	  followerIds:userIdArray,
    attachments: options.attachments
   });
    //updates tags and water bodies and cover image
	
  if (id) {
    //WHAT ARE THESE LINES DOING?
    Tags.update({ name: tagArray[0] }, { $inc: { count: 1} });	
    Tags.update({ name: options.water }, { $inc: { count: 1} });
	  Collections.Images.update({_id: options.cover}, {$set:{projectId:id}});
    _.forEach(options.attachments, function(attachmentId) {
      Collections.Files.update({_id: attachmentId}, {$set:{projectId:id}});
    });
  }
    
  return id;
  },
});

editProject= function(project) {
    //If no time is associated with the comment, add the current time. 

        modifiedTime = new Date().getTime();
    
    //Set the comment's foreign key to project.
  
    Projects.update( {_id : project._id}, {$set:{title: project.title, coordinates:project.coordinates, description:project.description, tags: 	project.tags, water: project.water, modified:modifiedTime} } );

	//UPDATE THE TAGS COUNT
}

addAuthor = function(author, project) {
   
        modifiedTime = new Date().getTime();
    
    //Set the comment's foreign key to project.
  
    Projects.update( {_id: project._id}, {$set:{ modified:modifiedTime} } );

    Projects.update( {_id: project._id}, {$push:{ authors:author} } );
	
}

addFollower = function(followerId, projectId) {
   
    modifiedTime = new Date().getTime();
    
    //Set the comment's foreign key to project.
  
    Projects.update( {_id: projectId}, {$set:{ modified:modifiedTime} } );

	// if (followerId !in project.follower)
	var project = Projects.findOne(projectId);
	if (project.followerIds.indexOf(followerId) <0 ){
    Projects.update( {_id: projectId}, {$push:{ followerIds: followerId} } );
	}
	
} 
setCoverId = function(imageId, project) {
   
        modifiedTime = new Date().getTime();
    
    //Set the comment's foreign key to project.
  
    Projects.update( {_id: project._id}, {$set:{ modified:modifiedTime} } );

    Projects.update( {_id: project._id}, {$set:{ cover:imageId} } );
	
}


setCoverUrl = function(url, project) {
   
        modifiedTime = new Date().getTime();
    
    //Set the comment's foreign key to project.
  
    Projects.update( {_id: project._id}, {$set:{ modified:modifiedTime} } );

    Projects.update( {_id: project._id}, {$set:{ coverUrl: url} } );
	
}

