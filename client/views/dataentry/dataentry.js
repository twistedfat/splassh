Template.viewData.helpers({
	testData:function(){
		return Datasets.find({_id:"wpwDKopM7ybfiFWpQ" });
},
	projectId: function () {
    	return Session.get('currentProjectId');
},
	biologicals: function(){
		return Biologicals.find( {projectId: Session.get('currentProjectId')} );
},
	teams: function(){
		return Teams.find();
},
	teamCount: function() {
		return Teams.find({}).count;
},
	chemicals: function(){
		return Chemicals.find( {projectId: Session.get('currentProjectId') });
},
	physicals: function(){
		return Physicals.find( {projectId: Session.get('currentProjectId') });
},
	waters: function(){
		return Waters.find({projectId: Session.get('currentProjectId')} );
},
	weathers: function(){
		return Weathers.find({projectId: Session.get('currentProjectId')} );
},
	isProjectAuthor: function () {
		return Projects.findOne({_id:Session.get('currentProjectId')}).authors.indexOf(SPLASSH.userName(Meteor.user()));
	}
 
});

Template.dataEntry.helpers({
	projectId: function () {
	    return Session.get('currentProjectId');
	},
	isProjectOwner: function () {
		return Meteor.userId() == Projects.findOne({_id:Session.get('currentProjectId')}).ownerId;
	},
	isProjectAuthor: function () {
		return Projects.findOne({_id:Session.get('currentProjectId')}).authors.indexOf(SPLASSH.userName(Meteor.user()));
	}
});

Template.registerHelper("projectName", function(param1){
	return (Projects.findOne({_id: param1})).title;
});

var hooksObject = {
	before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
		insert: function(doc) {
      // Potentially alter the doc
		doc.projectId = Session.get('currentProjectId');
		return doc;
      // Then return it or pass it to this.result()
      //return doc; (synchronous)
      //return false; (synchronous, cancel)
      //this.result(doc); (asynchronous)
      //this.result(false); (asynchronous, cancel)
    }
  }
};
//AutoForm.hooks({  insertSiteInfo: projectIdHook });
// Or pass `null` to run the hook for all forms in the app (global hook)
AutoForm.addHooks(null, hooksObject);
