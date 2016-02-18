Template.viewData.helpers({
	testData:function(){
		return Datasets.find({_id:"wpwDKopM7ybfiFWpQ" });
},
	projectId: function () {
    	return Session.get('currentProjectId');
},
	biologicals: function(){
		var cursor = Biologicals.find( {projectId: Session.get('currentProjectId')} );
		return {
			count: cursor.count(),
			items: cursor
		};
},
	teams: function(){
		var cursor = Teams.find({projectId: Session.get('currentProjectId') });
		return {
			count: cursor.count(),
			items: cursor
		};
},
	chemicals: function(){
		var cursor = Chemicals.find( {projectId: Session.get('currentProjectId') });
		return {
			count: cursor.count(),
			items: cursor
		};
},
	physicals: function(){
		var cursor = Physicals.find( {projectId: Session.get('currentProjectId') });
		return {
			count: cursor.count(),
			items: cursor
		};
},
	waters: function(){
		var cursor = Waters.find({projectId: Session.get('currentProjectId')} );
		return {
			count: cursor.count(),
			items: cursor
		};
},
	weathers: function(){
		var cursor = Weathers.find({projectId: Session.get('currentProjectId')} );
		return {
			count: cursor.count(),
			items: cursor
		};
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
		return Projects.findOne({_id:Session.get('currentProjectId')}).authors.indexOf(SPLASSH.userName(Meteor.user()))>-1; 
	},
isProjectAuthorId: function () {
		return Projects.findOne({_id:Session.get('currentProjectId')}).authorIds.indexOf((Meteor.user()._id))>-1 ;
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
  },
	after: {

	}
};
//AutoForm.hooks({  insertSiteInfo: projectIdHook });
// Or pass `null` to run the hook for all forms in the app (global hook)
AutoForm.addHooks(null, hooksObject);
