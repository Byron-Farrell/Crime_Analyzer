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
  public cities: Array<string>;
  public dropdownStyles: string;
  public cityMappingName: string;
  public userCrimeTypes: Array<string>;
  public applicationCrimeTypes: Array<string>;

  constructor(
    private fileUploadService: FileUploadService,
    private crimeService: CrimeService
  ) { }

  ngOnInit() {
    this.setup();
  }

  private setup(): void {
    this.columnMappings = this.fileUploadService.getColumnMappings();

    this.dropdownStyles = 'btn btn-secondary w-100';
    this.cityMappingName = 'City';
    this.applicationCrimeTypes = Array();
    this.cities = Array();
    this.userCrimeTypes = Array();

    this.crimeService.loadCities()
      .then(json => {
        json.forEach(type => {
          this.cities.push(type);
        })
      })
      .catch(error => console.error(error));

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
  }

  public dataMappingObjectUpdate(type, name): void {


  }
}
