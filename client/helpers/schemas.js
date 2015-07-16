Schemas = {};

Meteor.isClient && Template.registerHelper("Schemas", Schemas);

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

Schemas.Chemical = new SimpleSchema({
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
  'data.$.unit': {
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
  'data.$.unit': {
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
  'data.$.unit': {
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
  'data.$.unit': {
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
  'data.$.unit': {
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
    label: "Custom",
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
  'data.$.unit': {
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
  'data.$.unit': {
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