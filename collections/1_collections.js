Collections = {};

Meteor.isClient && Template.registerHelper("Collections", Collections);

Collections.Images = new FS.Collection("images", {
  stores: [
    Stores.images
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

Collections.Files = new FS.Collection("files", {
  stores: [Stores.any],
  chunkSize: 4 * 1024 * 1024
});

Collections.Docs = new Mongo.Collection("docs");
Collections.Docs.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  fileId: {
    type: String,
    autoform: {
      type: "cfs-file",
      collection: "files"
    }
  }
}));

Collections.Docs2 = new Mongo.Collection("docs2");
Collections.Docs2.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  fileId: {
    type: [String],
    autoform: {
      type: "cfs-files",
      collection: "files"
    }
  }
}));
