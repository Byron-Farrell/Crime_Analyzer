const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

mapboxgl.accessToken = 'pk.eyJ1Ijoid2hpdGUtd29sZiIsImEiOiJjazFjcmIzOWEwMG0xM2psbWY2MmtsNWQzIn0.IIJnDW-38tO7VExvQw-NYg';

let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 15
});
var popup = new mapboxgl.Popup()
  .setHTML('<h3>Reykjavik Roasters</h3><p>A good coffee shop</p>');

var marker = new mapboxgl.Marker()
  .setPopup(popup);

navigator.geolocation.getCurrentPosition((pos) => {
  map.setCenter([pos.coords.longitude, pos.coords.latitude]);
  marker.setLngLat([pos.coords.longitude, pos.coords.latitude]);
  marker.addTo(map);
  mapboxgl.circle([pos.coords.longitude, pos.coords.latitude], 10).addTo(map);
})

map.addControl(new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl
}));

map.addControl(new mapboxgl.NavigationControl());
