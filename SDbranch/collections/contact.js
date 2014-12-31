Feedback = new Meteor.Collection("feedback", {
    schema: {
        email: {
            type: String,
            label: "Email"
        },
        subject: {
            type: String,
            label: "Subject",
            max: 100
        },
        summary: {
            type: String,
            label: "Summary",
            optional: true,
            max: 1000
        }
    }
});

Feedback.allow({
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
