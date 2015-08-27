// -- server
// Collection(s) available to the client

// Publish all watertags, since its a tiny collection. 
Meteor.publish("tags", function() {
	return Tags.find({});
});

Meteor.publish("projects", function() {
	return Projects.find({});
});

Meteor.publish("comments", function() {
    return Comments.find({});
});

Meteor.publish("follows", function() {
    return Follows.find({});
});
Meteor.publish("datasets", function() {
    return Datasets.find({});
});
// in server.js
Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1, username: 1}});
});

Meteor.publishComposite('user', function() {
  return {
    find: function() {
      return Meteor.users.find({
        _id: this.userId
      });
    },
    children: [
      {
        find: function(user) {
          var _id, ref;
          _id = ((ref = user.profile) != null ? ref.picture : void 0) || null;
          return ProfilePictures.find({
            _id: _id
          });
        }
      }
    ]
  };
});

//cfs example
Meteor.publish("images", function() {
  return Collections.Images.find();
});

Meteor.publish("files", function() {
  return Collections.Files.find();
});

Meteor.publish("docs", function() {
  return Collections.Docs.find();
});

Meteor.publish("docs2", function() {
  return Collections.Docs2.find();
});
