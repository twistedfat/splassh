//add handler for cover photo
//adds _id of inserted photo to project.cover
function getHandler(dropped) {
  return FS.EventHandlers.insertFiles(Collections.Files, {
    metadata: function (fileObj) {
      return {
        ownerId: Meteor.userId(),
		projectId: Session.get('currentProjectId'),
        dropped: dropped
      };
    },
    after: function (error, fileObj) {
      if (!error) {
        console.log("Inserted", fileObj.name());
      }
    }
  });
}

// Can't call getHandler until startup so that Collections object is available
Meteor.startup(function () {

  Template.attachments.events({
    'dropped .attachmentArea': getHandler(true),
    'dropped .attachmentDropArea': getHandler(true),
    'change input.attachments': getHandler(false)
  });

});

Template.attachments.helpers({
	attachmentsByProject: function() {
  return Collections.Files.find({projectId: Session.get('currentProjectId')});
},
	allAttachments: function() {
  return Collections.Files.find();
},
	myAttachments: function() {
  return Collections.Files.find({ownerId: Meteor.userId()});
},
	isProjectOwner: function () {
		return Meteor.userId() == Projects.findOne({_id:Session.get('currentProjectId')}).ownerId;
	},
	isProjectAuthor: function () {
		return Meteor.userId() == Projects.findOne({_id:Session.get('currentProjectId')}).ownerId || Projects.findOne({_id:Session.get('currentProjectId')}).authors.indexOf(SPLASSH.userName(Meteor.user()));
	}
});
