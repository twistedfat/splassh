Template.projectmap.rendered = function() {
  
  var projectToGeojson = function(project) {
    return {
      "type": "Feature",
      "geometry" : {
        "type" : "Point",
        "coordinates": [project.coordinates.lng, project.coordinates.lat]
      },
      "properties": {
        "title": "[" + project.coordinates.lat + "," + project.coordinates.lng + "]",
        "description": 'Latitude,Longitude coordinates',
        /*
        "icon": {
            "iconUrl": "../marker.png",
            "iconSize": [38, 50], // size of the icon
            "iconAnchor": [19, 47], // point of the icon which will correspond to marker's location
            "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
            "className": "dot"
        }
        */
        'marker-size': 'large',
        'marker-color': '#BE9A6B',
        'marker-symbol': 'wetland'
      }
    };
  };
  
  // Make this data source reactive using Deps.autorun 
  var geojson = projectToGeojson(this.data);
  var lat  = geojson.geometry.coordinates[1];
  var lng = geojson.geometry.coordinates[0];
  
  var map = L.mapbox.map('projectmap', MAPBOX_ID, { zoomControl: true }).setView([lat,lng],9);

  map.panTo(L.latLng(lat, lng));
  
  map.dragging.disable();
  map.scrollWheelZoom.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();

  L.mapbox.featureLayer(geojson).addTo(map);
  
  //map.panTo(waterProjectsGeojson.geometry.coordinates);
 /* var featureLayer = L.mapbox.featureLayer()
    // Once this layer loads, we set a timer to load it again in a few seconds
 //   .on('click', function(e) { map.panTo(e.layer.getLatLng()); })
    .addTo(map)
    //Set custom marker icon;
    .on('layeradd', function(e) {
        var marker = e.layer,
          feature = marker.feature;
        marker.setIcon(L.icon(feature.properties.icon));
    })
    
  *
  L.mapbox.featureLayer({
    // this feature is in the GeoJSON format: see geojson.org
    // for the full specification
    type: 'Feature',
    geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: this.latlng
    },
    properties: {
        title: 'Peregrine Espresso',
        description: '1718 14th St NW, Washington, DC',
        // one can customize markers by adding simplestyle properties
        // https://www.mapbox.com/foundations/an-open-platform/#simplestyle
        'marker-size': 'large',
        'marker-color': '#BE9A6B',
        'marker-symbol': 'cafe'
    }
}).addTo(map);
*/
}