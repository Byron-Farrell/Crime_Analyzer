import { Component, OnInit } from '@angular/core';

import { CheckboxComponentItem } from '../../../interfaces/checkboxComponentItem'
import { CrimeService } from '../../services/crime.service';


@Component({
  selector: 'app-map-filter-options',
  templateUrl: './map-filter-options.component.html',
  styleUrls: ['./map-filter-options.component.scss']
})
export class MapFilterOptionsComponent implements OnInit {

  crimeTypeTitle: String;
  crimeTypeTooltipMessage: String;
  crimeTypes: Array<CheckboxComponentItem>;
  selectedCrimeTypes: Array<string>;

  constructor(private crimeService: CrimeService) {
    this.crimeTypeTitle = "Crime Type Options";
    this.crimeTypeTooltipMessage = "Select crime types to display on map"
    this.crimeTypes = [
      { display: "Theft-1", value: "THEFT", checked: false }
    ]
    this.selectedCrimeTypes = Array();
  }

  ngOnInit() {
  }
}
