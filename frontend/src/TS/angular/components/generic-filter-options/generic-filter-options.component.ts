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

  citiesTitle: string;
  citiesTooltipMessage: string;
  cities: Array<CheckboxComponentItem>;
  selectedCities: Array<string>;

  crimeTypeTitle: string;
  crimeTypeTooltipMessage: string;
  crimeTypes: Array<CheckboxComponentItem>;
  selectedCrimeTypes: Array<string>;

  dateTitle: string;
  dateTooltipMessage: string;
  dateDefaults;

  filterOptions: FilterOptionsObject;

  @Output() filterOptionsChange: EventEmitter<FilterOptionsObject> = new EventEmitter();

  constructor(private crimeService: CrimeService) {
    this.filterOptions = {};
  }

  ngOnInit() {

    // Setting up city filter variables
    this.citiesTitle = 'City';
    this.citiesTooltipMessage = 'Select city';
    this.cities = Array();
    this.selectedCities = Array();
    this.setupCities();

    // Setting up crime type filter variables
    this.crimeTypeTitle = "Crime Type";
    this.crimeTypeTooltipMessage = "Select crime types to display on map";
    this.selectedCrimeTypes = Array();
    this.crimeTypes = Array();
    this.setupCrimeTypes();

    // Setting up is date filter variables
    this.dateTitle = "Date";
    this.dateTooltipMessage = "Select crimes between a start and end date";
    this.dateDefaults = {};
    this.setupDateSelector();


  }

  // FIXME: make typeChange generic
  citiesChange(cities: Array<string>): void {
    this.filterOptions.cities = cities;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  crimeTypeChange(crimeTypes: Array<string>): void {
    this.filterOptions.crimeTypes = crimeTypes;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  startDatesChanged(startDate: string): void {
    this.filterOptions.startDate = startDate;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  endDatesChanged(endDate: string): void {
    this.filterOptions.endDate = endDate;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }


  private setupCities() {
    let loading = this.crimeService.loadCities();
    let _cities = this.cities;
    let _selectedCities = this.selectedCities = Array();

    loading
      .then(function(json) {
        json.forEach(type => {
          let newCity = {
            display: type,
            value: type,
            checked: true
          };
          _cities.push(newCity);
          if (newCity.checked === true) {
            _selectedCities.push(type)
          }
        });


      })

      .catch(error => console.log(error));
  }

  private setupDateSelector() {
    // start date
    let startDate = new Date();
    startDate.setFullYear(2018);
    startDate.setMonth(0)
    startDate.setDate(1)
    // end date
    let endDate = new Date();

    endDate.setFullYear(2018);
    endDate.setMonth(1)
    endDate.setDate(1)

    this.dateDefaults = {
      startDate: startDate,
      endDate: endDate
    }
  }

  private setupCrimeTypes(): void {

    let loading = this.crimeService.loadCrimeTypes();
    let _crimeTypes = this.crimeTypes;
    let _selectedCrimeTypes = this.selectedCrimeTypes;

    loading
      .then(function(json) {
        json.forEach(type => {
          let newCrimeType = {
            display: type,
            value: type,
            checked: true
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
