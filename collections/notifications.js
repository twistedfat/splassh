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
	if (comment.authorId !== project.ownerId) {
	Notifications.insert({
		userId: project.ownerId,
		projectId: project._id,
		projectOwner: project.owner,
		commentId: comment._id,
		commentAuthor: comment.author,
		read: false
	});
}
};
