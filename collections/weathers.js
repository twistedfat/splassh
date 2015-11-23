/* Primary data collection */
Weathers = new Meteor.Collection("weathers");

Weathers.allow({
    insert: function (userId, weather) {
      return true;
  },
  update: function (userId, weather, fields, modifier) {
    return true;
  },
  remove: function (userId, weather) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Weathers.attachSchema(Schemas.Weather);
