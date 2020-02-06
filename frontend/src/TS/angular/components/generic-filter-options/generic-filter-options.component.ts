import { Component, OnInit } from '@angular/core';

import { CheckboxComponentItem } from '../../../interfaces/checkboxComponentItem'
import { FilterOptionsObject } from '../../../interfaces/filterOptionsObject'
import { CrimeService } from '../../services/crime.service';


@Component({
  selector: 'app-generic-filter-options',
  templateUrl: './generic-filter-options.component.html',
  styleUrls: ['./generic-filter-options.component.scss']
})
export class GenericFilterOptionsComponent implements OnInit {

  crimeTypeTitle: String;
  crimeTypeTooltipMessage: String;
  crimeTypes: Array<CheckboxComponentItem>;
  selectedCrimeTypes: Array<string>;

  filterOptions: FilterOptionsObject;

  constructor(private crimeService: CrimeService) {
    this.setupCrimeTypes();
    this.filterOptions = {
      crimeTypes: this.selectedCrimeTypes
    }
  }

  ngOnInit() {

  }

  private setupCrimeTypes(): void {
    this.crimeTypeTitle = "Crime Type Options";
    this.crimeTypeTooltipMessage = "Select crime types to display on map";
    this.selectedCrimeTypes = Array();
    this.crimeTypes = Array();

    let loading = this.crimeService.loadCrimeTypes();
    let crimeTypes = this.crimeTypes;

    loading.then(function(json) {
      json.forEach(type => {
        let newCrimeType = {
          display: type,
          value: type,
          checked: false
        };
        crimeTypes.push(newCrimeType);
      });
    })
    .catch(error => console.log(error));
  }

  private loadData(): void {
    let loading = this.crimeService.loadCrimeData(this.filterOptions);

    loading.then(x => console.log(x))
  }

  onSelect(): void {
    this.loadData();
  }
}
