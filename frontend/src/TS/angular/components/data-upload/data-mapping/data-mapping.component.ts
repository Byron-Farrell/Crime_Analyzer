import { Component, OnInit } from '@angular/core';

// --------------- SERVICES ---------------
import { FileUploadService } from '../../../services/file-upload.service';
import { CrimeService } from '../../../services/crime.service';

@Component({
  selector: 'app-data-mapping',
  templateUrl: './data-mapping.component.html',
  styleUrls: ['./data-mapping.component.scss']
})
export class DataMappingComponent implements OnInit {

  public columnMappings: any;
  public dataType: string;
  public cities: Array<string>;
  public dropdownStyles: string;
  public cityMappingName: string;
  public cityMapping: any;

  public errorMessage: string;

  public userCrimeTypes: Array<string>;
  public applicationCrimeTypes: Array<string>;
  public applicationArrestTypes: Array<string>;
  public userArrestTypes: Array<string>;
  public newCity: string;
  public dateFormat: string;
  public timeFormat: string;

  private crimeTypeMappingDiv: any;
  private censusBlockMappingDiv: any;
  private censusInformationMappingDiv: any;
  private crimeTypeMappings: any;
  private arrestMappings: any;

  constructor(
    private fileUploadService: FileUploadService,
    private crimeService: CrimeService
  ) { }

  ngOnInit() {

    this.crimeTypeMappingDiv = document.getElementById('crimeTypeMapping');
    this.censusBlockMappingDiv = document.getElementById('censusBlockMapping');
    this.censusInformationMappingDiv = document.getElementById('censusInformationMapping');

    this.setup();

    if (this.dataType === 'Criminal Data') {
      this.setupCriminalDataMapping();
      this.displayCriminalDataMapping();
    }
    else if (this.dataType === 'Census Blocks') {
      this.setupCensusBlockMapping();
      this.displayCensusBlockMapping();
    }
    else if (this.dataType === 'Census Information') {
      this.setupCensusInformationMapping();
      this.displayCensusInformationMapping();
    }
    else {
      console.log('Unknown data type!');
    }
  }

  private setupCensusInformationMapping(): void {
    console.log('setupCensusInformationMapping');

  }

  private setupCensusBlockMapping(): void {
    console.log('setupCensusBlockMapping');

  }

  private setupCriminalDataMapping(): void {
    this.applicationCrimeTypes = Array();
    this.userCrimeTypes = Array();
    this.crimeTypeMappings = {};

    this.cityMapping = {}

    this.applicationArrestTypes = ['True', 'False'];
    this.userArrestTypes = Array();
    this.arrestMappings = {};


    this.crimeService.loadCrimeTypes()
      .then(json => {
        json.forEach(type => {
          this.applicationCrimeTypes.push(type);
        })
      })
      .catch(error => console.error(error));

    this.fileUploadService.getFileCrimeTypes()
      .then(json => {
        json.forEach(type => {
          this.userCrimeTypes.push(type);
        })
      })
      .catch(error => console.error(error));

      this.fileUploadService.getFileArrestValues()
        .then(json => {
          json.forEach(type => {
            this.userArrestTypes.push(type);
          })
        })
        .catch(error => console.error(error));
  }

  private displayCensusInformationMapping(): void {
    this.crimeTypeMappingDiv.style.display = 'none';
    this.censusBlockMappingDiv.style.display = 'none';
    this.censusInformationMappingDiv.style.display = 'block';
  }

  private displayCensusBlockMapping(): void {
    this.crimeTypeMappingDiv.style.display = 'none';
    this.censusBlockMappingDiv.style.display = 'block';
    this.censusInformationMappingDiv.style.display = 'none';
  }

  private displayCriminalDataMapping(): void {
    this.crimeTypeMappingDiv.style.display = 'block';
    this.censusBlockMappingDiv.style.display = 'none';
    this.censusInformationMappingDiv.style.display = 'none';
  }

  private isValid(mappings: any): boolean {
    this.errorMessage = "";
    // Checking for any unselected mappings i.e. mappings[key] === undefined
    for (let key in mappings) {
      if (!mappings[key]) {
        this.errorMessage = key + " is undefined";
        return false;
      }
    }

    return true;
  }

  private setup(): void {
    this.errorMessage = "";
    this.columnMappings = this.fileUploadService.getColumnMappings();
    this.dataType = this.fileUploadService.getDataType();

    this.dropdownStyles = 'btn btn-secondary w-100';
    this.cityMappingName = 'City';
    this.cities = Array();

    this.crimeService.loadCities()
      .then(json => {
        json.forEach(type => {
          this.cities.push(type);
        })
      })
      .catch(error => console.error(error));
  }

  public crimeTypeMappingObjectUpdate(userType, type): void {
    this.crimeTypeMappings[userType] = type;
  }

  public ArrestMappingObjectUpdate(userType, type): void {
    this.arrestMappings[userType] = type;
  }

  public cityMappingObjectUpdate(userType, type): void {
    this.cityMapping[userType] = type;
  }

  public import(): void {
    let obj = {
      city: this.cityMapping.City,
      crimeTypes: this.crimeTypeMappings,
      dateFormat: this.dateFormat,
      timeFormat: this.timeFormat
    };

    console.log(obj);

    if (this.isValid(obj)) {
      this.fileUploadService.importCrimes(obj);
    }

  }

  public addCity(): void {
    this.cities.push(this.newCity);
  }


}
