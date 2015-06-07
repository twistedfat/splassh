Template.loadTags.helpers({
    tags: function() {
        return Tags.find({tier:'tag'}, {sort: {number: 1}});
    }
});

Template.loadBodies.helpers({
    bodies: function() {
        return Tags.find({tier:'body of water'}, {sort: {number: 1}});
    }
});

Template.addProjectModal.helpers({
	rendered: function() {
  	$('[data-toggle="tooltip"]').tooltip();
   	// GAnalytics.pageview();
	}
});

Template.addProjectModal.events({
  'submit form': function(e,t) {
    e.preventDefault();

    //Get the coordinates
    var coordinates = {};
    var coordinatesArray = t.find('#project-coordinates').value.split(',');
    if  (coordinatesArray.length != 2) {
        toastr.error('[SE01]', 'Invalid coordinates.');
        return;
    } else {
        coordinates.lat = parseFloat(coordinatesArray[0].trim());
        coordinates.lng = parseFloat(coordinatesArray[1].trim());
        if(!(isFinite(coordinates.lat) || isFinite(coordinates.lng))) {
          toastr.error('[SE01a]', 'Invalid coordinates.');
            return;
        }
    }

	var tags = t.find('#project-category').value;
        tags = tags.trim();      
        if (!tags || tags === "Select Tag") {
          toastr.warning("Cannnot post without a category tag");
          return;
        }
	var water = t.find('#project-water').value,
        water = water.trim();
        if (!water || water === "Select Tag") {
          toastr.warning("Cannnot post without a water body tag");
          return;
        }

    var project = {
      title: t.find('#project-title').value,
      coordinates: coordinates,
      description: t.find('#project-description').value,
      tags: tags,
      water: water,
    }
    
    //If the user is logged in,
    if (Meteor.user()) {
      //Insert the project to the database and update the tags database
      project._id = Meteor.call("createProject", project, function(error, result) {
        if (error) {
          toastr.error('ERROR CREATING PROJECT: ' + error);
          return;
        }
        toastr.success('Project added!','info');
        $('#addWaterProjectModal').modal('hide');
        // force routing to map here
        Router.go('project', {'_id': result});
        //map.panTo(project.coordinates);
      });
    } else {
      $('#addWaterProjectModal').modal('hide');
      showSignInPrompt(function(err) {
        if (err) {
          toastr.error('[SE02] ' + err);
          return;
        }

        //Insert the project to the database and update the tags database
        project._id = Meteor.call("createProject", project, function(error, result) {
          if (error) {
            toastr.error('[SE03]: ' + error);
            return;
          }

          toastr.success('Project added!','info');
          $('#addWaterProjectModal').modal('hide');
        });
        
      });
    }
  },
  'click #geolocate-button': function(e, t) {
    if (navigator.geolocation) {
      var timeout = window.setTimeout(function() {
        toastr.info('Please ensure device has location enabled, or internet is connected.');
      }, 5000);
      navigator.geolocation.getCurrentPosition(function(position) {
        $('#project-coordinates').val(position.coords.latitude + "," + position.coords.longitude);
        window.clearTimeout(timeout);
      });
    } else {
      toastr.warning('Geolocation is not supported by this browser.', '[warning]');
    }
  }
});
