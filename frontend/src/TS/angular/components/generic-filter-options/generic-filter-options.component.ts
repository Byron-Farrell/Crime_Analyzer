// --------------- ANGULAR ---------------
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

// -------------- INTERFACES --------------
import { CheckboxComponentItem } from '../../../interfaces/checkboxComponentItem'
import { FilterOptionsObject } from '../../../interfaces/filterOptionsObject'

// --------------- SERVICES ---------------
import { CrimeService } from '../../services/crime.service';


@Component({
  selector: 'app-generic-filter-options',
  templateUrl: './generic-filter-options.component.html',
  styleUrls: ['./generic-filter-options.component.scss']
})
export class GenericFilterOptionsComponent implements OnInit {

  crimeTypeTitle: string;
  crimeTypeTooltipMessage: string;
  crimeTypes: Array<CheckboxComponentItem>;
  selectedCrimeTypes: Array<string>;

  filterOptions: FilterOptionsObject;

  @Output() filterOptionsChange: EventEmitter<FilterOptionsObject> = new EventEmitter();

  constructor(private crimeService: CrimeService) {
    this.filterOptions = {
      crimeTypes: Array()
    }
  }

  ngOnInit() {

    this.setupCrimeTypes();
  }

  private setupCrimeTypes(): void {
    this.crimeTypeTitle = "Crime Type Options";
    this.crimeTypeTooltipMessage = "Select crime types to display on map";
    this.selectedCrimeTypes = Array();
    this.crimeTypes = Array();

    let loading = this.crimeService.loadCrimeTypes();
    let crimeTypes = this.crimeTypes;

    loading
      .then(function(json) {
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

  crimeTypeChange(crimeTypes: Array<string>): void {
    this.filterOptions.crimeTypes = crimeTypes;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }
}
