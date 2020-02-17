// --------------- ANGULAR ---------------
import { Component, AfterViewInit } from '@angular/core';

// --------------- SERVICES ---------------
import { CrimeService } from '../../services/crime.service';

import 'leaflet';
import 'leaflet.markercluster';

const L = window['L'];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [ './map.component.scss' ]
})
export class MapComponent implements AfterViewInit {

  private map;
  private markerClusters;

  constructor(private crimeService: CrimeService) {
    this.crimeService.getObservable().subscribe(data => {
      this.createCrimeMarkers(data, this);
    })
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
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
      position: 'topright'
    }).addTo(this.map);

    // Setting tile layer to mapbox streets
    L.tileLayer(TILE_LAYER, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets',
      accessToken: TOKEN
    }).addTo(this.map);


  }


  // FIXME: is there a way to get rid of the (self) parameter
  private createCrimeMarkers(crimes, self): void {
    // If there is a marker cluster layer from a previous query then this block
    // of code will remove it
    if (self.map.hasLayer(self.markerClusters)) {
      self.map.removeLayer(self.markerClusters);
    }

    self.markerClusters = L.markerClusterGroup();

    crimes.forEach(function( crime ) {
      let marker = L.marker([crime.latitude, crime.longitude]);
      let text = `
        <h6 class="text-center">Crime Details</h6><br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Date:</b> ${crime.day}/${crime.month}/${crime.year},<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Time:</b> ${crime.hour}:00 PM,<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Type:</b> ${crime.crimetype},<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Description:</b> ${crime.crimeDescription},<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Arrest:</b> ${crime.arrest ? 'yes' : 'no'},<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Cloud Cover:</b> ${crime.cloudCover}%,<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Degrees:</b> ${crime.degrees},<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Dark:</b> ${crime.isDark ? 'yes' : 'no'},<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Precipitation:</b> ${crime.precipitation}mm,<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">WeatherType:</b> ${crime.weatherType},<br>
        <b data-toggle="tooltip" data-placement="top" title="Add Description">Moon Phase:</b> ${crime.moonPhase},<br>

      `
      marker.bindPopup(text).openPopup();
      self.markerClusters.addLayer( marker );

    });
    self.map.addLayer( self.markerClusters );
  }

  // fix for leafet default marker not loading
  // https://github.com/PaulLeCam/react-leaflet/issues/255
  private markerFix(): void {
    // delete L.Icon.Default.prototype._getIconUrl;
    //
    // L.Icon.Default.mergeOptions({
    //   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    //   iconUrl: require('leaflet/dist/images/marker-icon.png'),
    //   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    // });
  }
}
