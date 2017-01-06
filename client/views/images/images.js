//add handler for cover photo
//adds _id of inserted photo to project.cover
function getHandler(dropped) {
  return FS.EventHandlers.insertFiles(Collections.Images, {
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

  Template.images.events({
    'dropped .imageArea': getHandler(true),
    'dropped .imageDropArea': getHandler(true),
    'change input.images': getHandler(false)
  });

});

Template.viewImages.helpers({
	imagesByProject: function() {
  return Collections.Images.find({projectId: Session.get('currentProjectId')});
},
	allImages: function() {
  return Collections.Images.find();
},
	myImages: function() {
  return Collections.Images.find({ownerId: Meteor.userId()});
}
});

Template.images.helpers({
	imagesByProject: function() {
  return Collections.Images.find({projectId: Session.get('currentProjectId')});
},
	allImages: function() {
  return Collections.Images.find();
},
	myImages: function() {
  return Collections.Images.find({ownerId: Meteor.userId()});
},
	isProjectOwner: function () {
		return Meteor.userId() == Projects.findOne({_id:Session.get('currentProjectId')}).ownerId;
	},
	isProjectAuthor: function () {
		return Projects.findOne({_id:Session.get('currentProjectId')}).authors.indexOf(SPLASSH.userName(Meteor.user()));
	}
});
