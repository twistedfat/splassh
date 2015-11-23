/* Primary data collection */
Datasets = new Meteor.Collection("datasets");

Datasets.allow({
    insert: function (userId, dataset) {
      return true;
  },
  update: function (userId, dataset, fields, modifier) {
    return true;
  },
  remove: function (userId, dataset) {
    // You can only remove projects that you created and nobody has posted comments to.
    //return project.owner === userId && commented(project) === 0;
    return true;
  }
});


addDataset = function(dataset, project) {
    //If no time is associated with the comment, add the current time.
    if (typeof dataset.posted === 'undefined') {
        var date = new Date();
        dataset.posted = date.getTime();
    }
    //Set the comment's foreign key to project.
    dataset.projectId = project._id;
    Datasets.insert(dataset);
}

    //If no time is associated with the comment, add the current time.
editDataset = function(dataset, project) {
   
        var date = new Date();
        editTime= date.getTime();
    
    //Set the comment's foreign key to project.
  
    Datasets.update( {_id: project._id}, {$set:{edited:editTime} } );
}

Datasets.attachSchema(Schemas.SiteInfo);
Datasets.attachSchema(Schemas.Monitors);
