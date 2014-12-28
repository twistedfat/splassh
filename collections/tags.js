/* This collection is available to both client and server */

Tags = new Meteor.Collection("tags");
/*, {
  schema: {
    excerpt: {
      type: String,
      label: "Excerpt",
      optional: false
    },
    likes: {
      type: Number,
      min: 0,
      optional: true
    },
    references: {
      type: Number,
      label: "Unique project references",
      min: 0,
      optional: true
    },
    title: {
      type: String,
      optional: false,
    },
    uses: {
      type: Number,
      min: 0
    }
  } 
});
*/
//Do not allow anything in the database to be modified without a Meteor.call
Tags.allow({
  insert: function (userId, tag) {
    return true;
  },
  update: function (userId, tag, fields, modifier) {
    return true;
  },
  remove: function (userId, tag) {
    return true;
  }
});