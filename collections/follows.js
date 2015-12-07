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
    return true; 
  },
  update: function (userId, followid, fields, modifier) {
    return true;
  },
  remove: function (userId, followId) {
    return true;
  }
});

// should probably add this to another file in the global scope, such as lib/globals.js or something
addFollow = function(project) {
    //If no time is associated with the comment, add the current time.
    //Set the comment's foreign key to project.
   var follow = {
	userId: Meteor.user()._id,
    owner:  SPLASSH.userName(Meteor.user()),
    projectId: project._id,
	title: project.title,
	  
       };
	Follows.insert(follow);
}
//addFollow == receive notifications , for receviing notifictions for a project you commented on
