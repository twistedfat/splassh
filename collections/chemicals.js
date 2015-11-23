/* Primary data collection */
Chemicals = new Meteor.Collection("chemicals");

Chemicals.allow({
    insert: function (userId, chemicals) {
      return true;
  },
  update: function (userId, chemicals, fields, modifier) {
    return true;
  },
  remove: function (userId, chemicals) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Chemicals.attachSchema(Schemas.Chemicals);
