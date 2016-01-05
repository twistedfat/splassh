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
	},
	clearCover: function() {
	 Session.set('coverId', "no");
}
});

var coverHandler = function(event, template) {
    //needs error handling
	
	FS.Utility.eachFile(event, function(file) {
      var newFile = new FS.File(file);

		newFile.ownerId= Meteor.userId();


      cover = Collections.Images.insert(newFile, function (err, fileObj) {
        //If !err, we have inserted new doc with ID fileObj._id, and
        //kicked off the data upload using HTTP
		 if(!err){
			console.log("Inserted",cover);
		}
      });
		//remove the following line and replace with error handling in case cover is bad data ^

	  Session.set('coverId', cover._id);
    });

  };

Template.addProjectModal.events({

  'dropped .imageArea':coverHandler,
    'dropped .imageDropArea': coverHandler,
    'change input.images': coverHandler,

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

    // Upload attachments
    var attachmentFiles = $('.form-addwaterproject').find('input[name=attachments]').get(0).files;
    var attachments = _.map(attachmentFiles, function(file) {
      var newFile = new FS.File(file);
      newFile.ownerId= Meteor.userId();
      return Collections.Files.insert(newFile);
    });

    var project = {
      title: t.find('#project-title').value,
	  waterbody: t.find('#project-waterbody').value,
      coordinates: coordinates,
      description: t.find('#project-description').value,
      tags: tags,
      water: water,
	    cover: Session.get('coverId'),
      attachments: _.pluck(attachments, '_id') // Array of id's
    };
    console.log(project);
    
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
      }, 8000);
      navigator.geolocation.getCurrentPosition(function(position) {
        $('#project-coordinates').val(position.coords.latitude + "," + position.coords.longitude);
        window.clearTimeout(timeout);
      });
    } else {
      toastr.warning('Geolocation is not supported by this browser.', '[warning]');
    }
  },
  'click #map-button': function(e, t) {
    e.preventDefault();
	Router.go('/map');
	}
});
