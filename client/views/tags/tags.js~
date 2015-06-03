// shows all tags on /tags route
Template.tagsList.helpers({
 tags: function() {
  return Tags.find({tier:'tag'}, { sort : { number : 1} });//,{title: 1, excerpt: 1, tag: 1, count: 1 });
},
bodies : function() {
  return Tags.find({tier:'body of water'}, { sort : { number : 1} });//,{title: 1, excerpt: 1, tag: 1, count: 1 });
}
});
