/*
  Schema:
  mailer { _id, email, dateSubscribed }
*/

/* Primary data collection */
Mailer = new Meteor.Collection("mailer");

//Do not allow anything without a Meteor.call
Mailer.allow({
  insert: function (userId, tag) {
      return true;
  },
  update: function (userId, tag, fields, modifier) {
    return false;
  },
  remove: function (userId, tag) {
    return false;
  }
});

/**
* Adds email to the Mailer collection. Uses current time for dateSubscribed
*
* @method addEmailToMailingList
* @param {String} email The email to be added
* @param {Function} callback Optional. If present, called with an error object
* as the first argument and, if no error, the _id as the second.
*/
addEmailToMailingList = function(email, callback) {
    //TODO: Validate email using regex
    var date = new Date();
    //By document, I mean the document to be added to the MongoDB database.
    var emailDocument = {email: email, dateSubscribed: date.getTime()};
    
    Mailer.insert(emailDocument, callback);
}

//TODO: Use Meteor.call for inserting emails and ensure there are no duplicates.