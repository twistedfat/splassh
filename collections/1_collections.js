Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Collections.Files = new FS.Collection("files", {
  stores: [Stores.files],
  chunkSize: 4 * 1024 * 1024
});

Collections.Images = new FS.Collection("images", {
  stores: [
    Stores.images, Stores.thumbnails
  ],
  filter: {	
    maxSize: 20 * 1024 * 1024, //in bytes
    allow: {
      contentTypes: ['image/*']
    },
    onInvalid: function(message) {
      Meteor.isClient && alert(message);
    }
	}
});
