/* Primary data collection */
GoogleDocs = new Meteor.Collection("googleDocs");

GoogleDocs.allow({
    insert: function (userId, googleDoc) {
      return true;
  },
  update: function (userId, googleDoc, fields, modifier) {
    return true;
  },
  remove: function (userId, googleDoc) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

GoogleDocs.attachSchema(Schemas.GoogleDoc);
