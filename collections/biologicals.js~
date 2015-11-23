/* Primary data collection */
Biologicals = new Meteor.Collection("biologicals");

Biologicals.allow({
    insert: function (userId, biologicals) {
      return true;
  },
  update: function (userId, biologicals, fields, modifier) {
    return true;
  },
  remove: function (userId, biologicals) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Biologicals.attachSchema(Schemas.Biologicals);
