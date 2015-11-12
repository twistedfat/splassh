function trueFunc(userId) {
  if (!userId) {
    // must be logged in
    return false;
  }
  return true;
}
function falseFunc() {return false;}

Meteor.users.allow({
  update: function(userId, doc, fieldNames, modifier) {
    if (userId === doc._id && !doc.username && fieldNames.length === 1 && fieldNames[0] === 'username') {
      return true;
    } else {
      return false;
    }
  }
});

Collections.Images.allow({
  insert: trueFunc,
  update: trueFunc,
  remove: trueFunc,
  download: trueFunc
});

Collections.Images.deny({
  insert: falseFunc,
  update: falseFunc,
  remove: falseFunc,
  download: falseFunc
});

Collections.Files.allow({
  insert: trueFunc,
  update: trueFunc,
  remove: trueFunc,
  download: trueFunc
});

Collections.Files.deny({
  insert: falseFunc,
  update: falseFunc,
  remove: falseFunc,
  download: falseFunc
});

