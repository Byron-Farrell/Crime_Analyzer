// --------------- ANGULAR ---------------
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

// -------------- INTERFACES --------------
import { CheckboxComponentItem } from '../../../interfaces/checkboxComponentItem'
import { FilterOptionsObject } from '../../../interfaces/filterOptionsObject'

// --------------- SERVICES ---------------
import { CrimeService } from '../../services/crime.service';

@Component({
  selector: 'app-map-filter-options',
  templateUrl: './map-filter-options.component.html',
  styleUrls: ['./map-filter-options.component.scss']
})
export class MapFilterOptionsComponent implements OnInit {
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

  private setupWeatherTypes() {
    let loading = this.crimeService.loadWeatherTypes();
    let _weatherTypes = this.weatherTypes;
    let _selectedWeatherTypes = Array();
    loading
      .then(function(json) {
        json.forEach(type => {
          let newWeatherType = {
            display: type,
            value: type,
            checked: true
          };
          _weatherTypes.push(newWeatherType);

          if (newWeatherType.checked) {
            _selectedWeatherTypes.push(type)
          }
        });
      })
      .then( _ => this.weatherTypeChange(_selectedWeatherTypes))
      .catch(error => console.log(error));
  }

  private setupMoonTypes() {
    let loading = this.crimeService.loadMoonTypes();
    let _moonTypes = this.moonPhaseTypes;
    let _selectedMoonTypes = Array();
    loading
      .then(function(json) {
        json.forEach(type => {
          let newMoonType = {
            display: type,
            value: type,
            checked: true
          };
          _moonTypes.push(newMoonType);

          if (newMoonType.checked) {
            _selectedMoonTypes.push(type);
          }
        });
      })
      .then( _ => this.moonTypeChange(_selectedMoonTypes))
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
  }


}
