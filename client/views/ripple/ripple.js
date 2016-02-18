Template.theripple.helpers({
	projects : function() {
  // get the top 5 recently added projects
  return Projects.find({}, {sort: { date_created: -1}, limit: 4});//.sort({_id: -1}).limit(5);
},
cover: function(){
	return this.cover;
},
coverImage:function(){
	return Collections.Images.find({_id:this.cover});
}
});


