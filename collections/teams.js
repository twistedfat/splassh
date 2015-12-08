/* Primary data collection */
Teams = new Meteor.Collection("teams");

Teams.allow({
    insert: function (userId, team) {
      return true;
  },
  update: function (userId, team, fields, modifier) {
    return true;
  },
  remove: function (userId, team) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

Teams.attachSchema(Schemas.Team);
