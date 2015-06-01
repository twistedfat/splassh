Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  url: {
    type: String,
    label: "Url"
  },
  imageLocation: {
    type: String,
    optional: true
  }
}));

Template.addImageModal.helpers({
	rendered: function() {
  	$('[data-toggle="tooltip"]').tooltip();
   	// GAnalytics.pageview();
	}
});

Template.addImageModal.events({
  'submit form': function(e,t) {
    e.preventDefault();


    var dataset = {
	owner:  SPLASSH.userName(Meteor.user()),
        avatarUrl: Gravatar.imageUrl(SPLASSH.userEmail(Meteor.user())),
	type: "image", 
      url: t.find('#image-link').value
};
     addDataset(dataset, this);
     
    //If the user is logged in,
   ('#addImageModal').modal('hide');
        
  }
});
