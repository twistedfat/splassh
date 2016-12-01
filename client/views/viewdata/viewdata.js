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
