Schemas = {};

Meteor.isClient && Template.registerHelper("Schemas", Schemas);

Schemas.Projects = new SimpleSchema({
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.username,
            value: user._id
          };
        });
      }
    }
  },
	date_created: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
	authorIds: {
	type:Array,
	optional:true
	},
	'authorIds.$':{
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.username,
            value: user._id
          };
        });
      }
    }
  },
});

Schemas.Comments = new SimpleSchema({

 projectId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  authorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.username,
            value: user._id
          };
        });
      }
    }
  },
	posted: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
	body: {
	type: String,
	max: 1000,
	autoform:{
		rows:3
	}
	}
});


Schemas.Tags = new SimpleSchema({
	
  name: {
    type: String,
    max: 50
  },
  excerpt: {
    type: String,
    label: "Message",
    max: 1000,
	autoform: {
         rows: 3
	}
},
	tier:{
	type: String,
	max:30
	}

});

Schemas.ContactForm = new SimpleSchema({
  name: {
    type: String,
    label: "Your name",
    max: 50
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "E-mail address"
  },
  message: {
    type: String,
    label: "Message",
    max: 1000
  }
});

Schemas.Photos = new SimpleSchema({

//probably not
//but maybe :D

photos: {
    type: Array,
  },
  'photos.$': {
    type: Object
  },
  'photos.$.title': {
    type: String
  },
  'photos.$.comment': {
    type: String,
	optional: true
  },
  'photos.$.photo': {
    type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "file"
      }
	}
  }

});

Schemas.WaterObservations = new SimpleSchema({
   Flow: {
    type: String,
	optional:true,
    autoform: {
    type: "select-checkbox",
      options: function () {
        return [
          {label: "Dry", value: "Dry"},
          {label: "Stagnant/Still", value: "Stagnant/Still"}
        ];
      }
    }
  },
Level: {
    type: String,
	optional:true,
    autoform: {
    type: "select-checkbox",
      options: function () {
        return [
          {label: "Low", value: "Low"},
          {label: "Normal", value: "Normal"},
          {label: "High", value: "High"},
          {label: "Flood", value: "Flood"}
        ];
      }
    }
  },
Clarity: {
    type: String,
	optional:true,
    autoform: {
    type: "select-checkbox",
      options: function () {
        return [
          {label: "Clear/Transparent", value: "Clear/Transparent"},
          {label: "Cloudy/Somewhat Turbid", value: "Cloudy/Somewhat Turbid"},
          {label: "Opaque/Turbid", value: "Opaque/Turbid"}
			//other
        ];
      }
    }
  },

Color: {
    type: String,
	optional:true,
    autoform: {
    type: "select-checkbox",
      options: function () {
        return [
          {label: "No Color", value: "No Color"},
          {label: "Brown/Muddy", value: "Brown/Muddy"},
          {label: "Green", value: "Green"},
          {label: "Milky/White", value: "Milky/White"},
          {label: "Tannic", value: "Tannic"}
			//other			
        ];
      }
    }
  },
Surface: {
    type: String,
	optional:true,
    autoform: {
    type: "select-checkbox",
      options: function () {
        return [
          {label: "Clear", value: "Clear"},
          {label: "Oily Sheen", value: "Oily Sheen"},
          {label: "Algae", value: "Algae"},
          {label: "Foam", value: "Foam"},
          {label: "Greater than 3\" high", value: "Greater than 3\" high"},
          {label: "Pure White", value: "Pure White"}
		//other
        ];
      }
    }
  },
Odor: {
    type: String,
	optional:true,
    autoform: {
    type: "select-checkbox",
      options: function () {
        return [
          {label: "Natural/None", value: "Natural/None"},
          {label: "Gasoline", value: "Gasoline"},
          {label: "Sewage", value: "Sewage"},
          {label: "Rotten Egg", value: "Rotten Egg"},
          {label: "Fishy", value: "Fishy"},
          {label: "Chlorine", value: "Chlorine"}
		//other
        ];
      }
    }
  },
Trash: {
    type: String,
	optional:true,
    autoform: {
    type: "select-checkbox",
      options: function () {
        return [
          {label: "None", value: "None"},
          {label: "Yes, I did a cleanup", value: "Yes, I did a cleanup"},
          {label: "This site needs an organized cleanup", value: "This site needs an organized cleanup"}
        ];
      }
    }
  }
});

Schemas.Site = new SimpleSchema({
  Group: {
    type: String,
    label: "Group name",
    max: 50
  },
  GroupID: {
    type: String,
	max:50
  },
  SiteID: {
    type: String,
	max:50
  },
  Stream:{
	type:String,
	label:"Stream name",
	max:50
  },
   Monitors:{
	type:String, 
	max:50
	},
	Participants:{
	type:Number, 
	label:"Number of Participants"
	},
	EventDate:{
	type:String,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
    }
	},
	Duration:{
	type:Number,
	label:"Time spent sampling in hours"
	}
});

Schemas.Weather  = new SimpleSchema({
  Conditions: {
    type: String,
	optional:true,
    autoform: {
    type: "select-checkbox",
      options: function () {
        return [
          {label: "Heavy Rain", value: "Heavy Rain"},
          {label: "Steady Rain", value: "Steady Rain"},
          {label: "Intermittent Rain", value: "Intermittent Rain"},
          {label: "Overcast", value: "Overcast"},
          {label: "Partly Cloudy", value: "Partly Cloudy"},
          {label: "Clear/Sunny", value: "Clear/Sunny"}
        ];
      }
    }
  },
  rain: {
    type: Number,
    label: "Amount in Inches",
	optional:true
  },
  duration: {
    type: Number,
    label: "Over how many hours?",
    optional:true
  }
});


Schemas.Chemical  = new SimpleSchema({
  ConductivityMeterCalibration: {
    type: Object,
	optional:true
	},
   'ConductivityMeterCalibration.date': {
    type: String,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
  },
	'ConductivityMeterCalibration.Standard':{
	type:String,
	label:"Standard Value"
},
'ConductivityMeterCalibration.Initial':{
	type:String,
	label:"Initial Meter Reading"
},
'ConductivityMeterCalibration.Adjusted':{
	type:String,
	label:"Meter Adjusted to"
},
	Reagents:{
	type:Object, 
	optional: true
	},
	'Reagents.AnyReagentsExpired?':{
	type:String,
	autoform: {
      afFieldInput: {
        type: "boolean-radios"
      }
    }
	},
	'Reagents.Expired':{
	type:Array
	},
	'Reagents.Expired.$':{
	type:String,
	label:"List Expired Reagents"
	},

	CoreTests: {
    type: Object,
	optional:true
	},
   'CoreTests.AirTemp': {
    type: Object
  },
	 'CoreTests.AirTemp.Tests':{
	type:Array
	},
	 'CoreTests.AirTemp.Tests.$':{
	type:Number,
	decimal:true
	},
	 'CoreTests.AirTemp.units':{
	type:String,
	defaultValue:"C"
	},
 'CoreTests.WaterTemp': {
    type: Object
  },
	 'CoreTests.WaterTemp.Tests':{
	type:Array
	},
	 'CoreTests.WaterTemp.Tests.$':{
	type:Number,
	decimal:true
	},
	 'CoreTests.WaterTemp.units':{
	type:String,
	defaultValue:"C"
	},
'CoreTests.pH': {
    type: Object
  },
	 'CoreTests.pH.Tests':{
	type:Array
	},
	 'CoreTests.pH.Tests.$':{
	type:Number,
	decimal:true,
	label:"+/-0.25"
	},
	 'CoreTests.pH.units':{
	type:String,
	defaultValue:"Standard units"
	},
'CoreTests.DissolvedOxygen': {
    type: Object
  },
	 'CoreTests.DissolvedOxygen.Tests':{
	type:Array
	},
	 'CoreTests.DissolvedOxygen.Tests.$':{
	type:Number,
	decimal:true,
	label:"+/-0.6"
	},
	 'CoreTests.DissolvedOxygen.units':{
	type:String,
	autoform: {
      type: "select",
      options: function () {
        return [
          {label: "mg/L", value: "mg/L"},
          {label: "ppm", value: "ppm"}
        ];
      }
    }
	},
'CoreTests.Conductivity': {
    type: Object
  },
	 'CoreTests.Conductivity.Tests':{
	type:Array
	},
	 'CoreTests.Conductivity.Tests.$':{
	type:Number
	},
	 'CoreTests.Conductivity.units':{
	type:String,
	defaultValue:"uS/cm"
	},
OtherTests: {
    type: Array,
	optional:true
  },
'OtherTests.$':{
	type:Object
},
	'OtherTests.$.Name':{
	type:String
	},
	 'OtherTests.$.Tests':{
	type:Array
	},
	 'OtherTests.$.Tests.$':{
	type:Number,
	decimal:true
	},
	 'OtherTests.$.units':{
	type:String
	}

});

Schemas.Bacterial  = new SimpleSchema({
	 Plates:{
		type:Array,
		label:"# of Colonies on each plate (including one blank plate)"
	},
	'Plates.$':{
		type:Number,
		label:"Colonies"
	},
	AverageColonies:{
		type:Object
	},
	'AverageColonies.value':{
		type:Number,
		decimal:true
	},
	'AverageColonies.units':{
		type:String,
		defaultValue:"cfu/100mL"
	},
	HoldingTime:{
	type:Object
	},
	'HoldingTime.Total':{
	type:Number, 
	decimal:true,
	label:"Total (in hours)"
	},
	'HoldingTime.Start':{
	type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
	},
	'HoldingTime.Stop':{
	type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
	},
	Temp:{
	type:Object
	},
	'Temp.min':{
	type:Number,
	decimal:true
	},
	'Temp.max':{
	type:Number,
	decimal:true
	},
	'Temp.Units':{
	type:String,
	defaultValue:"C"
	}
	
	
});

Schemas.LeChemical = new SimpleSchema({
  title: {
    type: String,
    label: "Chemical",
	autoform: {
      type: "select",
      options: function () {
        return [
		  {label: "Conductivity", value: "Conductivity"},
          {label: "Salinity", value: "Salinity"},
          {label: "pH", value: "pH"},
          {label: "Dissolved Oxygen", value: "Dissolved Oxygen"},
          {label: "Carbon Dioxide", value: "Carbon Dioxide"},
          {label: "Biological Oxygen Demand", value: "Biological Oxygen Demand"},
          {label: "Chlorophyll", value: "Chlorophyll"}
        ];
      }
    }
  },
  data: {
    type: Array,
  },
  'data.$': {
    type: Object
  },
  'data.$.value': {
    type: String
  },
  'data.$.units': {
    type: String,
	optional: true,
	autoform: {
      type: "select",
      options: function () {
        return [
		  {label: "Siemens", value: "Siemens"},
          {label: "ppt", value: "ppt"},
          {label: "pH", value: "pH"},
          {label: "mg/l", value: "mg/l"}
        ];
      }
    }
  },
  'data.$.date': {
    type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
  },
  metadata:{
	type:Object,
	optional: true
	},
	'metadata.device':{
		type:String,
		optional: true
	},
	'metadata.preCallibration':{
		type:String,
		optional: true
	},
	'metadata.postCallibration':{
		type:String,
		optional: true
	},
	'metadata.timeCollected':{
		type:String,
		optional: true,
		autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
	},
	'metadata.weather':{
		type:String,
		optional: true
	}
	
});

Schemas.Nutrients = new SimpleSchema({
  title: {
    type: String,
    label: "Nutrient",
	autoform: {
      type: "select",
      options: function () {
        return [
		  {label: "Nitrates", value: "Nitrates"},
          {label: "Phosphates", value: "Phosphates"}
        ];
      }
    }
  },
  data: {
    type: Array,
  },
  'data.$': {
    type: Object
  },
  'data.$.value': {
    type: String
  },
  'data.$.units': {
    type: String,
	optional: true
  },
  'data.$.date': {
    type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
  }
});

Schemas.Physical = new SimpleSchema({
  title: {
    type: String,
    label: "Physical",
	autoform: {
      type: "select",
      options: function () {
        return [
		  {label: "Temperature", value: "Temperature"},
          {label: "Clarity", value: "Clarity"},
		  {label: "Flow", value: "Flow"},
          {label: "Area", value: "Area"},
		  {label: "Depth", value: "Depth"}
        ];
      }
    }
  },
  data: {
    type: Array,
  },
  'data.$': {
    type: Object
  },
  'data.$.value': {
    type: String
  },
  'data.$.units': {
    type: String,
	optional: true
  },
  'data.$.date': {
    type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
  }
});

Schemas.Contaminants = new SimpleSchema({
  title: {
    type: String,
    label: "Contaminants",
	autoform: {
      type: "select",
      options: function () {
        return [
		  {label: "Pesticides", value: "Pesticides"},
          {label: "Herbicides", value: "Herbicides"},
		  {label: "Hydrocarbons", value: "Hydrocarbons"},
          {label: "Fecal Coliforms", value: "Fecal Coliforms"},
		  {label: "Harmful Algae Blooms", value: "Harmful Algae Blooms"}
        ];
      }
    }
  },
  data: {
    type: Array,
  },
  'data.$': {
    type: Object
  },
  'data.$.value': {
    type: String
  },
  'data.$.units': {
    type: String,
	optional: true
  },
  'data.$.date': {
    type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
  }
});

Schemas.Biological = new SimpleSchema({
  title: {
    type: String,
    label: "Biological",
	autoform: {
      type: "select",
      options: function () {
        return [
		  {label: "Bacteria", value: "Bacteria"},
          {label: "Blue Green Algae", value: "Blue Green Algae"},
		  {label: "Phytoplankton", value: "Phytoplankton"},
          {label: "Zooplankton", value: "Zooplankton"},
		  {label: "Algae", value: "Algae"},
		  {label: "Plants", value: "Plants"},
          {label: "Inverts", value: "Inverts"},
		  {label: "Fish", value: "Fish"},
          {label: "Amphibians", value: "Amphibians"},
		  {label: "Reptiles", value: "Reptiles"},
          {label: "Birds", value: "Birds"},
		  {label: "Mammals", value: "Mammals"}
        ];
      }
    }
  },
  data: {
    type: Array,
  },
  'data.$': {
    type: Object
  },
  'data.$.value': {
    type: String
  },
  'data.$.units': {
    type: String,
	optional: true
  },
  'data.$.date': {
    type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
  }
});


Schemas.Custom = new SimpleSchema({
  title: {
    type: String,
    label: "Name:",
	max:100
  },
  data: {
    type: Array,
  },
  'data.$': {
    type: Object
  },
  'data.$.value': {
    type: String
  },
  'data.$.units': {
    type: String,
	optional: true
  },
  'data.$.date': {
    type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
  }
});

Schemas.firstdraft = new SimpleSchema({
  title: {
    type: String,
    label: "Parameter",
	autoform: {
      type: "select",
      options: function () {
        return [
		  {label: "pH", value: "pH"},
          {label: "Dissolved Oxyen", value: "Dissolved Oxyen"},
          {label: "Nitrates", value: "Nitrates"},
          {label: "Phosphates", value: "Phosphates"},
          {label: "Temperature", value: "Temperature"}
        ];
      }
    }
  },
  data: {
    type: Array,
  },
  'data.$': {
    type: Object
  },
  'data.$.value': {
    type: String
  },
  'data.$.units': {
    type: String,
	optional: true
  },
  'data.$.date': {
    type: String,
	optional: true,
	autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
  },
  author: {
    type: String,
    label: "Author Info (student, professor, organization, etc)",
	optional:true,
	autoform: {
      type: "select",
      options: function () {
        return [
		  {label: "citizen scientist", value: "citizen scientist"},
          {label: "elementary school student", value: "elementary student"},
          {label: "middle school student", value: "middle school student"},
          {label: "high school student", value: "high school student"},
          {label: "college student", value: "college student"},
          {label: "graduate student", value: "graduate student"},
		  {label: "professional", value: "professional"},
	      {label: "organization", value: "organization"}
        ];
      }
    }
  },
  equipment: {
    type: String,
    label: "Equipment + Calibration/Specficiations",
    min: 0,
	optional:true
  },
  collected: {
    type: Date,
    label: "Was this collected at (about) the same time?",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker"
      }
	}
  },
  notes: {
    type: String,
    label: "Additional Notes",
    optional: true,
    max: 1000,
	 autoform: {
         rows: 3
	}
  }
});
