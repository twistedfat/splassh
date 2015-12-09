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

//cfs example
Meteor.publish("images", function() {
  return Collections.Images.find();
});


Meteor.publish("files", function() {
  return Collections.Files.find();
});
Meteor.publish("sites", function() {
    return Sites.find({});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
	//find where commenterId!:this.userId
});

Meteor.publish('teams', function() {
	return Teams.find({});
	//find where commenterId!:this.userId
});

Meteor.publish('waters', function() {
	return Waters.find({});
	//find where commenterId!:this.userId
});

Meteor.publish('weathers', function() {
	return Weathers.find({});
	//find where commenterId!:this.userId
});

Meteor.publish('chemicals', function() {
	return Chemicals.find({});
	//find where commenterId!:this.userId
});

Meteor.publish('biologicals', function() {
	return Biologicals.find({});
	//find where commenterId!:this.userId
});

Meteor.publish('physicals', function() {
	return Physicals.find({});
	//find where commenterId!:this.userId
});
