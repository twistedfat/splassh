/* Primary data collection */
Monitors = new Meteor.Collection("monitors");

Monitors.allow({
    insert: function (userId, monitor) {
      return true;
  },
  update: function (userId, monitor, fields, modifier) {
    return true;
  },
  remove: function (userId, monitor) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Monitors.attachSchema(Schemas.Monitors);
