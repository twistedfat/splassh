/* Primary data collection */
Sites = new Meteor.Collection("sites");

Sites.allow({
    insert: function (userId, site) {
      return true;
  },
  update: function (userId, site, fields, modifier) {
    return true;
  },
  remove: function (userId, site) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Sites.attachSchema(Schemas.Site);
