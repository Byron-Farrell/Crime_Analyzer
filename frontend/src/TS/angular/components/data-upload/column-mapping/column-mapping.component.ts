import { Component, OnInit } from '@angular/core';

// --------------- SERVICES ---------------
import { FileUploadService } from '../../../services/file-upload.service';
@Component({
  selector: 'app-column-mapping',
  templateUrl: './column-mapping.component.html',
  styleUrls: ['./column-mapping.component.scss']
})
export class ColumnMappingComponent implements OnInit {

  public fileData: any;
  public columns: Array<string>;

  private criminalColumns: Array<string>;
  private censusBlockColumns: Array<string>;
  private censusInformationColumns: Array<string>;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.criminalColumns = [
      'Crime Type',
      'Crime Description',
      'Arrest',
      'Longitude',
      'Latitude',
      'Date'
    ];

    this.censusBlockColumns = [
      'Block Id',
      'Geo'
    ];

    this.censusInformationColumns = [
      'Block Id',
      'Deprevation Index'
    ];

    // if (this.dataType === 'Criminal Data')
    // {
    //   this.columns = this.criminalColumns;
    // }
    // else if (this.dataType === 'Census Blocks') {
    //   this.columns = this.censusBlockColumns;
    // }
    // else if (this.dataType === 'Census Information') {
    //   this.columns = this.censusInformationColumns;
    // }

    this.columns = this.criminalColumns;
    
    this.fileData = this.fileUploadService.getData();

  }


}
