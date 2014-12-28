/*
UI.registerHelper("primaryTag", function() {
  // container context - most cases, {{# projects}} this
 /* var me = this, tags = me.tags[0] || {};
  return tags;   
  /
  var projectId = AmplifiedSession.get('currentProjectId');
  if (projectId) {
    var project = Projects.findOne({ _id: projectId}), tags = project.tags;
    if (typeof tags !== 'undefined' && tags !== null) {
      return tags[0];
    }
  } 
  return;  
});
*/