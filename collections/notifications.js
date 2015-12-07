Notifications = new Meteor.Collection('notifications');

ownsDocument = function(userId, doc) {
return doc && doc.userId === userId;
}

Notifications.allow({
 insert: function (userId, tag) {
      return true;
  },
  update: ownsDocument,
  remove: function (userId, tag) {
    return true;
  }
});


createCommentNotification = function(comment) {
	var project = Projects.findOne(comment.projectId);
	var followers = project.followerIds;
	for (var i in followers) {
		if(comment.authorId != followers[i]){
			Notifications.insert({
				userId: followers[i],
				projectId: project._id,
				commentId: comment._id,
				commentAuthor: comment.author,
				commentAuthorId: comment.authorId,
				read: false
			});
		}
	}
};
