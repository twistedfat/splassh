Template.map.rendered = function() {

  var geolocate = $('.geolocate');
  var click = document.getElementById('click'),
    mousemove = document.getElementById('mousemove');
  
  var projectToGeojson = function(project) {
    return {
      "type": "Feature",
      "geometry" : {
        "type" : "Point",
        "coordinates": [project.coordinates.lng, project.coordinates.lat]
      },
      "properties": {
        "title": project.title,
        "description": project.description,
        "tag": project.tag,
        "url": Router.routes['project'].path({_id: project._id})
        /*        "icon": {
            "iconUrl": "/packages/images/marker-icon.png",
        //    "iconSize": [38, 50], // size of the icon
            //"iconAnchor": [19, 47], // point of the icon which will correspond to marker's location
            //"popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
            //"className": "dot"
        },
        'marker-color': '#ff8888',
        'marker-symbol': 'star'
        */
      }
    };
  };

  // Make this data source reactive using Deps.autorun
  var waterProjectsGeojson = [];

  map = SPLASSH.map = L.mapbox.map('map', MAPBOX_ID)
    .setView([37.71859, -97.73437], 4)
    .addControl(L.mapbox.geocoderControl(MAPBOX_ID, { position: 'topleft', keepOpen: false }));

  var featureLayer = L.mapbox.featureLayer()
    // Once this layer loads, we set a timer to load it again in a few seconds
    .on('click', function(e) { map.panTo(e.layer.getLatLng()); })
    .addTo(map);

  //Set custom marker icon;
  featureLayer.on('layeradd', function(e) {
      var marker = e.layer,
        feature = marker.feature;
    //  marker.setIcon(L.icon(feature.properties.icon));
        marker.setIcon(L.mapbox.marker.icon({
          'marker-color': '#ff8888',
          'marker-symbol': 'star',
          'marker-size': 'medium'
        }));
  });

  Projects.find().observe({
      added: function(project) {
       if(isProjectValid(project)) {
        waterProjectsGeojson.push(projectToGeojson(project));
        featureLayer.setGeoJSON(waterProjectsGeojson);
        //TODO: Find a faster way that does not loop
          featureLayer.eachLayer(function(layer) {
              var popupTemplate =
                '<h3 class="popup-project-title"><a href="{{url}}">{{title}}</a></h3>' +
                //'<div class="popup-project-description">{{description}}</div>' +
                '<div class="popup-project-tag">{{tag}}</div>';
              var popupHTML = L.mapbox.template(popupTemplate, layer.feature.properties);

              layer.bindPopup(popupHTML);
          });
        }
      }
      // updated - if project moved, remove marker, add new geojson object to new location, otherwise just update fields
      // removed - if project deleted by owner, research how to remove markers via mapboxjs
  });

  if (!navigator.geolocation) {
      geolocate.innerHTML = 'Geolocation is not available';
    } else {
      geolocate.click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
    });
  }

  map.on('mousemove click', function(e) {
    var latlng = e.latlng.lat + ',' + e.latlng.lng;
    window[e.type].innerHTML = latlng;
  });
  
  // when user double clicks on browser, or taps on mobile, add project modal shows up 
  map.on('dblclick', function(e) {
    $('button[data-toggle="modal"].hidden-xs').trigger('click');
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    $('input#project-coordinates').val(lat +',' + lng);
  });

  // Once we've got a position, zoom and center the map
  // on it, and add a single marker.
  map.on('locationfound', function(e) {
    map.fitBounds(e.bounds);
    map.setView([e.latitude, e.longitude], 13);
    /*featureLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });
  */
    // And hide the geolocation button
    //geolocate.parentNode.removeChild(geolocate);
  });

  // If the user chooses not to allow their location
  // to be shared, display an error message.
  map.on('locationerror', function() {
    toastr.warning('[SE04]','Location could not be found. Please ensure your device has geolocation turned on');
  });

}