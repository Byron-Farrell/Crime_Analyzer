import { Component, OnInit } from '@angular/core';

import { CheckboxComponentItem } from '../../../interfaces/checkboxComponentItem'

@Component({
  selector: 'app-map-filter-options',
  templateUrl: './map-filter-options.component.html',
  styleUrls: ['./map-filter-options.component.scss']
})
export class MapFilterOptionsComponent implements OnInit {

  crimeTypeTitle: String;
  crimeTypeTooltipMessage: String;
  crimeTypes: Array<CheckboxComponentItem>;

  crimeTypeTitle1: String;
  crimeTypeTooltipMessage1: String;
  crimeTypes1: Array<CheckboxComponentItem>;


  constructor() {
    this.crimeTypeTitle = "Crime Type Options";
    this.crimeTypeTooltipMessage = "Select crime types to display on map"
    this.crimeTypes = [
      { display: "Theft-1", value: "THEFT1", checked: false },
      { display: "Theft-2", value: "THEFT2", checked: true },
      { display: "Theft-3", value: "THEFT3", checked: false },
      { display: "Theft-4", value: "THEFT4", checked: false },
      { display: "Theft-5", value: "THEFT5", checked: false },
      { display: "Theft-6", value: "THEFT6", checked: false },
      { display: "Theft-7", value: "THEFT7", checked: true },
    ]

    this.crimeTypeTitle1 = "Crime Type Options1";
    this.crimeTypeTooltipMessage1 = "Select crime types to display on map1"
    this.crimeTypes1 = [
      { display: "Theft-1", value: "THEFT1", checked: false },
      { display: "Theft-2", value: "THEFT2", checked: true },
      { display: "Theft-3", value: "THEFT3", checked: false },
      { display: "Theft-4", value: "THEFT4", checked: false },
      { display: "Theft-5", value: "THEFT5", checked: false },
      { display: "Theft-6", value: "THEFT6", checked: false },
      { display: "Theft-7", value: "THEFT7", checked: true },
    ]
  }

  ngOnInit() {
  }

}
