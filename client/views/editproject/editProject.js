Template.editloadTags.helpers({
    tags: function() {
        return Tags.find({tier:'tag'}, {sort: {number: 1}});
    },
	tag: function(){
	var project = Projects.findOne({_id:Session.get("projectId")});
	return project.tags[0];
	},
	water: function(){
	var project = Projects.findOne({_id:Session.get("projectId")});
	return project.water;
	},
});

Template.editloadBodies.helpers({
    bodies: function() {
        return Tags.find({tier:'body of water'}, {sort: {number: 1}});
    },
	project: function(){
	return Projects.find({_id: Session.get("projectId")}, {limit:1});
	},
});

Template.editProjectModal.helpers({
	rendered: function() {
  	$('[data-toggle="tooltip"]').tooltip();
   	// GAnalytics.pageview();
	},
	getSessionProjectId: function(){
	return Session.get("projectId");
	},
	project: function(){
	return Projects.find({_id: Session.get("projectId")}, {limit:1});
	},
	getLat: function(){
	return Projects.findOne({_id:Session.get("projectId")}).coordinates.lat;
	},
	getLng: function(){
	return Projects.findOne({_id:Session.get("projectId")}).coordinates.lng;
	}
});

Template.editProjectModal.events({
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
        if (!tags || tags === "") {
          toastr.warning("Cannnot post without a category tag");
          return;
        }
	var water = t.find('#project-water').value,
        water = water.trim();
        if (!water || water === "") {
          toastr.warning("Cannnot post without a water body tag");
          return;
        }

    var project = {
	_id: Session.get("projectId"),
      title: t.find('#project-title').value,
      coordinates: coordinates,
      description: t.find('#project-description').value,
       tags: tags,
      water: water,
    }
	editProject(project);
    toastr.success('Project updated!','info');
    $('#editWaterProjectModal').modal('hide');


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
