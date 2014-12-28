// shows all tags on /tags route
Template.tagsList.tags = function() {
  return Tags.find({}, { sort : { name : 1} });//,{title: 1, excerpt: 1, tag: 1, count: 1 });
}