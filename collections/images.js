Collects = {};

Meteor.isClient && Template.registerHelper("Collects", Collects);

Collects.Images = new FS.Collection("images", {
  stores: [
    Stores.images,
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

