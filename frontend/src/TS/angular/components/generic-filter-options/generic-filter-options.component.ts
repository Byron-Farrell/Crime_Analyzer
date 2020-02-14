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

  weatherTypeTitle: string;
  weatherTypeTooltipMessage: string;
  weatherTypes: Array<CheckboxComponentItem>;
  selectedWeatherTypes: Array<string>;

  filterOptions: FilterOptionsObject;

  @Output() filterOptionsChange: EventEmitter<FilterOptionsObject> = new EventEmitter();

  constructor(private crimeService: CrimeService) {
    this.filterOptions = {
      crimeTypes: Array(),
      weatherTypes: Array()
    }
  }

  ngOnInit() {
    this.setupCrimeTypes();
    this.setupWeatherTypes();
  }

  crimeTypeChange(crimeTypes: Array<string>): void {
    this.filterOptions.crimeTypes = crimeTypes;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  weatherTypeChange(weatherTypes: Array<string>): void {
    this.filterOptions.weatherTypes = weatherTypes;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  private setupWeatherTypes() {
    this.weatherTypeTitle = "Weather Type Options";
    this.weatherTypeTooltipMessage = "Select weather types to display on map";
    this.selectedWeatherTypes = Array();
    this.weatherTypes = Array();

    let loading = this.crimeService.loadWeatherTypes();
    let _weatherTypes = this.weatherTypes;
    let _selectedWeatherTypes = this.selectedWeatherTypes = Array();

    loading
      .then(function(json) {
        json.forEach(type => {
          let newWeatherType = {
            display: type,
            value: type,
            checked: false
          };
          _weatherTypes.push(newWeatherType);

          if (newWeatherType.checked === true) {
            _selectedWeatherTypes.push(type)
          }
        });
      })
      .then(() => this.weatherTypeChange(_selectedWeatherTypes))
      .catch(error => console.log(error));
  }

  private setupCrimeTypes(): void {
    this.crimeTypeTitle = "Crime Type Options";
    this.crimeTypeTooltipMessage = "Select crime types to display on map";
    this.selectedCrimeTypes = Array();
    this.crimeTypes = Array();

    let loading = this.crimeService.loadCrimeTypes();
    let _crimeTypes = this.crimeTypes;
    let _selectedCrimeTypes = this.selectedCrimeTypes;

    loading
      .then(function(json) {
        json.forEach(type => {
          let newCrimeType = {
            display: type,
            value: type,
            checked: false
          };
          _crimeTypes.push(newCrimeType);

          if (newCrimeType.checked === true) {
            _selectedCrimeTypes.push(type)
          }
        });
      })
      .then(() => this.crimeTypeChange(_selectedCrimeTypes))
      .catch(error => console.log(error));
  }
}
