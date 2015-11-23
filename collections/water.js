/* Primary data collection */
Waters = new Meteor.Collection("waters");

Waters.allow({
    insert: function (userId, waters) {
      return true;
  },
  update: function (userId, waters, fields, modifier) {
    return true;
  },
  remove: function (userId, waters) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Waters.attachSchema(Schemas.WaterObservations);
