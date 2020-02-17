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

  moonPhaseTypeTitle: string;
  moonPhaseTypeTooltipMessage: string;
  moonPhaseTypes: Array<CheckboxComponentItem>;
  selectedMoonPhaseTypes: Array<string>;

  isDarkTypeTitle: string;
  isDarkTypeTooltipMessage: string;
  isDarkTypes: Array<CheckboxComponentItem>;
  selectedIsDarkTypes: Array<string>;

  dateTitle: string;
  dateTooltipMessage: string;
  dateDefaults;

  CloudCoverTitle: string;
  CloudCoverTooltipMessage: string;
  CloudCoverMin: number;
  CloudCoverMax: number;
  CloudCoverStep: number;
  CloudCoverSuffix: string;

  degreesTitle: string;
  degreesTooltipMessage: string;
  degreesMin: number;
  degreesMax: number;
  degreesStep: number;
  degreesSuffix: string;


  precipitationTitle: string;
  precipitationTooltipMessage: string;
  precipitationMin: number;
  precipitationMax: number;
  precipitationStep: number;
  precipitationSuffix: string;

  filterOptions: FilterOptionsObject;

  @Output() filterOptionsChange: EventEmitter<FilterOptionsObject> = new EventEmitter();

  constructor(private crimeService: CrimeService) {
    this.filterOptions = {};
  }

  ngOnInit() {
    // Setting up crime type filter variables
    this.crimeTypeTitle = "Crime Type";
    this.crimeTypeTooltipMessage = "Select crime types to display on map";
    this.selectedCrimeTypes = Array();
    this.crimeTypes = Array();
    this.setupCrimeTypes();

    // Setting up crime type filter variables
    this.weatherTypeTitle = "Weather Type";
    this.weatherTypeTooltipMessage = "Select weather types to display on map";
    this.selectedWeatherTypes = Array();
    this.weatherTypes = Array();
    this.setupWeatherTypes();

    // Setting up moon phase filter variables
    this.moonPhaseTypeTitle = "Moon Phase";
    this.moonPhaseTypeTooltipMessage = "Select crimes commited on the selected moon phases";
    this.selectedMoonPhaseTypes = Array();
    this.moonPhaseTypes = Array();
    this.setupMoonTypes();

    // Setting up is dark filter variables
    this.isDarkTypeTitle = "Dark";
    this.isDarkTypeTooltipMessage = "Select crimes commited on based on if it is dark or not outside";
    this.isDarkTypes = Array();
    this.selectedIsDarkTypes = Array();
    this.setupIsDarkTypes();

    // Setting up is date filter variables
    this.dateTitle = "Date";
    this.dateTooltipMessage = "Select crimes between a start and end date";
    this.dateDefaults = {};
    this.setupDateSelector();

    this.CloudCoverTitle = 'Cloud Cover';
    this.CloudCoverTooltipMessage = 'Filter by cloud cover. 0% means no clouds/clear skys and 100% means cloudy'
    this.CloudCoverMin = 0;
    this.CloudCoverMax = 100;
    this.CloudCoverStep = 1;
    this.CloudCoverSuffix = '%';


    this.degreesTitle = 'Degrees';
    this.degreesTooltipMessage = 'Select crimes commited between two temperatures';
    this.degreesMin = -60;
    this.degreesMax = 55;
    this.degreesStep = 1;
    this.degreesSuffix = 'C';

    this.precipitationTitle = 'Precipitation'
    this.precipitationTooltipMessage = 'Precipitation filter'
    this.precipitationMin = 0;
    this.precipitationMax = 2;
    this.precipitationStep = 0.1;
    this.precipitationSuffix = 'mm';

  }

  // FIXME: make typeChange generic
  crimeTypeChange(crimeTypes: Array<string>): void {
    this.filterOptions.crimeTypes = crimeTypes;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  weatherTypeChange(weatherTypes: Array<string>): void {
    this.filterOptions.weatherTypes = weatherTypes;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  moonTypeChange(weatherTypes: Array<string>): void {
    this.filterOptions.moonTypes = weatherTypes;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  isDarkTypeChange(isDarkTypes: Array<boolean>): void {
    this.filterOptions.isDark = isDarkTypes;
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

  cloudCoverChanged(object): void {
    this.filterOptions.cloudCover = object;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  degreesChanged(object): void {
    this.filterOptions.degrees = object;
    this.filterOptionsChange.emit({ ...this.filterOptions })
  }

  precipitationChanged(object): void {
    this.filterOptions.precipitation = object;
    this.filterOptionsChange.emit({ ...this.filterOptions })
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

  private setupWeatherTypes() {
    let loading = this.crimeService.loadWeatherTypes();
    let _weatherTypes = this.weatherTypes;
    let _selectedWeatherTypes = this.selectedWeatherTypes = Array();

    loading
      .then(function(json) {
        json.forEach(type => {
          let newWeatherType = {
            display: type,
            value: type,
            checked: true
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

  private setupMoonTypes() {
    let loading = this.crimeService.loadMoonTypes();
    let _moonTypes = this.moonPhaseTypes;
    let _selectedMoonTypes = this.selectedMoonPhaseTypes;

    loading
      .then(function(json) {
        json.forEach(type => {
          let newMoonType = {
            display: type,
            value: type,
            checked: true
          };
          _moonTypes.push(newMoonType);

          if (newMoonType.checked === true) {
            _selectedMoonTypes.push(type)
          }
        });
      })
      .then(() => this.moonTypeChange(_selectedMoonTypes))
      .catch(error => console.log(error));
  }

  private setupIsDarkTypes() {
    this.isDarkTypes = [
      {
        display: 'Yes',
        value: 'true',
        checked: true
      },
      {
        display: 'No',
        value: 'false',
        checked: true
      }
    ];

    this.isDarkTypes.forEach(element => {
      if (element.checked === true) {
        this.selectedIsDarkTypes.push(element.value)
      }
    });
  }

}
