Template.viewData.helpers({
	datasetbyProject: function() {
  return Datasets.find({projectId: Session.get('currentProjectId')});
},
	allDatasets: function() {
  return Datasets.find();
},
	myDatasets: function() {
  return Datasets.find({ownerId: Meteor.userId()});
},
	testData:function(){
	return Datasets.find({_id:"wpwDKopM7ybfiFWpQ" });
},
 projectId: function () {
    return Session.get('currentProjectId');
  }
});

Template.dataEntry.helpers({
  projectId: function () {
    return Session.get('currentProjectId');
  }
});

Template.registerHelper("projectName", function(param1){
	return (Projects.findOne({projectId: param1})).title;
});

var projectIdHook = {
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

AutoForm.hooks({  insertSiteInfo: projectIdHook });
