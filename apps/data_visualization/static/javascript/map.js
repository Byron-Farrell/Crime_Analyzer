let leaflet = require('leaflet');

function init() {
  // Map options
  let options = {
    zoomControl: false
  };

  // Creating map
  let map = leaflet.map('map', options);

  // setting default starting location and zoom
  // [latitude, longitude]
  map.setView([53.262584, -6.253751], 13);

  // Setting zoom controls to top right
  leaflet.control.zoom({
    position: 'topleft'
  }).addTo(map);

  // Setting tile layer to mapbox streets
  leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid2hpdGUtd29sZiIsImEiOiJjazFqZmFpbW4wMGxzM2RwZXVpZmZpaDd6In0.7zFS8kc9PpULLdfKjV0KEw', {
  	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  	maxZoom: 100,
  	id: 'mapbox.streets',
  	accessToken: 'pk.eyJ1Ijoid2hpdGUtd29sZiIsImEiOiJjazFqZmFpbW4wMGxzM2RwZXVpZmZpaDd6In0.7zFS8kc9PpULLdfKjV0KEw'
  }).addTo(map);

  return map;
}

export default init;
