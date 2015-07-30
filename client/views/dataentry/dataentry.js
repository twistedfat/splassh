Template.project.helpers({
	images: function () {
    return Collects.Images.find(); // Where Images is an FS.Collection instance
  }
})

Template.dataEntry.events({
 'change input.images': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Collects.Images.insert(file, function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    });
  }
})
