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
Meteor.publish("images", function() {
	return Collects.Images.find();
});

