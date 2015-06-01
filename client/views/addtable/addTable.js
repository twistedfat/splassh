Schemas = {};

Template.registerHelper("Schemas", Schemas);

Schemas.PersonWithContacts = new SimpleSchema({
  TableName: {
    type: String,
    index: 1,
    unique: true
  },
  TableDescription: {
    type: String,
    optional: true
  },
  Notes: {
    type: String,
    optional: true
  },
  readings: {
    type: Array,
    optional: true
  },
  'readings.$': {
    type: Object
  },
  'readings.$.Measurement': {
    type: String
  },
  'readings.$.Reading': {
    type: String
  },
  'readings.$.Instrument': {
    type: String
  }
});

var Collections = {};

Template.registerHelper("Collections", Collections);

PeopleWithContacts = Collections.PeopleWithContacts = new Mongo.Collection("PeopleWithContacts");
PeopleWithContacts.attachSchema(Schemas.PersonWithContacts);

Meteor.publish(null, function () {
  return PeopleWithContacts.find();
});

PeopleWithContacts.allow({
  update: function () {
    return true;
  }
});

Template.updatepush.helpers({
  exampleDoc: function () {
    return PeopleWithContacts.findOne();
  }
});
//

Template.loadMeasurements.helpers({
    measurements: function() {
        return Tags.find({tier:'measurement'}, {sort: {number: 1}});
    }
});
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

Template.addTableModal.helpers({
	rendered: function() {
  	$('[data-toggle="tooltip"]').tooltip();
   	// GAnalytics.pageview();
	}, 
	 addInput: function(divName){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "Entry " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
          document.getElementById(divName).appendChild(newdiv);
          counter++;
     }
}
});
/** 
var counter = 0;
var limit = 3;

Template.addTableModal.events({
	 'click .addInput': function(e, t) {

        e.preventDefault();
 	if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "Entry " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
          document.getElementById("dynamicInput").appendChild(newdiv);
          counter++;
     }
	}

 'submit form': function(e,t) {
    e.preventDefault();

    //Get the coordinates
    var coordinates = {};
    var coordinatesArray = t.find('#table-coordinates').value.split(',');
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
 
    var project = {
      title: t.find('#table-title').value,
      coordinates: coordinates,
      description: t.find('#table-description').value,
      tags: t.find('#table-tag').value,
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

});*/
