import 'leaflet.markercluster/dist/leaflet.markercluster.js';
export class Map {

  constructor() {
    this.map = null;
  }

  // create and retuen leaflet map object
  init() {
    // mapbox access token
    const TOKEN = 'pk.eyJ1Ijoid2hpdGUtd29sZiIsImEiOiJjazFqZmFpbW4wMGxzM2RwZXVpZmZpaDd6In0.7zFS8kc9PpULLdfKjV0KEw';
    // mapbox tile layer
    const TILE_LAYER = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + TOKEN;
    // Map options
    const MAP_OPTIONS = {
      zoomControl: false
    };

    // Creating map
    this.map = L.map('map', MAP_OPTIONS);

    // setting default starting location and zoom
    // [latitude, longitude]
    this.map.setView([ 41.8781, -87.6298], 13);

    // Setting zoom controls to top right
    L.control.zoom({
      position: 'topleft'
    }).addTo(this.map);

    // Setting tile layer to mapbox streets
    L.tileLayer(TILE_LAYER, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 100,
      id: 'mapbox.streets',
      accessToken: TOKEN
    }).addTo(this.map);

    this.markerFix();
    this.displayCrimeMarkers();
  }

  // fix for leafet default marker not loading
  // https://github.com/PaulLeCam/react-leaflet/issues/255
  markerFix() {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }

  createCrimeMarkers(crimes, map) {
    crimes.forEach(function( crime ) {
      crime = crime.fields;
      let marker = L.marker([crime.longitude, crime.latitude]);
      let text = `
        <b>Crime Details</b><br>
        Date: ${crime.date},<br>
        Type: ${crime.descOne},<br>
        Description: ${crime.descTwo},<br>
        Block: ${crime.block},<br>
        arrest: ${crime.arrest ? 'yes' : 'no'},<br>
      `
      marker.bindPopup(text).openPopup();
      marker.addTo(map);
    });
  }

  displayCrimeMarkers() {
    const HOST = 'http://127.0.0.1:8009/';
    const GET_CRIMES = 'getCrimes';
    const OPTIONS = {
      method: 'GET'
    };

    let mapObj = this;

    fetch(HOST + GET_CRIMES)
      .then(response => response.json())
      .then(json => this.createCrimeMarkers(json, this.map))
      .catch(error => console.error(error));
  }
}
