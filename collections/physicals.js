/* Primary data collection */
Physicals = new Meteor.Collection("physicals");

Physicals.allow({
    insert: function (userId, physicals) {
      return true;
  },
  update: function (userId, physicals, fields, modifier) {
    return true;
  },
  remove: function (userId, physicals) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Physicals.attachSchema(Schemas.Physical);
