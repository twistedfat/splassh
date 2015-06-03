/* Primary data collection */
Follows = new Meteor.Collection("follows");

/* Collection prototype 
+ * _id, public, owner
+ * info { title, description, tags, coordinates }
+ * log { created, updated, deleted, published }
+ * comments { _id, author, posted, body, public }
+ */

Follows.allow({
  insert: function (userId, followId) {
    return true; // no cowboy inserts -- use createProject method
  },
  update: function (userId, followid, fields, modifier) {
    return true;
  },
  remove: function (userId, followId) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});

// should probably add this to another file in the global scope, such as lib/globals.js or something
addFollow = function(project) {
    //If no time is associated with the comment, add the current time.
    //Set the comment's foreign key to project.
    var follow
    follow.followId = project._id    
    Follows.insert(follow);
}
