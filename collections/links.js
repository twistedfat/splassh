/* Primary data collection */
Links = new Meteor.Collection("links");

Links.allow({
    insert: function (userId, link) {
      return true;
  },
  update: function (userId, link, fields, modifier) {
    return true;
  },
  remove: function (userId, link) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Links.attachSchema(Schemas.Link);
