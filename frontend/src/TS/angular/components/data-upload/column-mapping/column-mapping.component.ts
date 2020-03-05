import { Component, OnInit, AfterViewInit } from '@angular/core';

// --------------- SERVICES ---------------
import { FileUploadService } from '../../../services/file-upload.service';
@Component({
  selector: 'app-column-mapping',
  templateUrl: './column-mapping.component.html',
  styleUrls: ['./column-mapping.component.scss']
})
export class ColumnMappingComponent implements OnInit, AfterViewInit {

  public fileData: any;
  public columns: Array<string>;

  private columnMappings: any;
  private dataType: string;
  private criminalColumns: Array<string>;
  private censusBlockColumns: Array<string>;
  private censusInformationColumns: Array<string>;

  private columnMappingView;
  private dataPreviewView;
  public dropdownStyles: string;
  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.columnMappings = {};
    this.dropdownStyles = "btn btn-secondary w-100";
    this.criminalColumns = [
      'Unique ID',
      'Crime Type',
      'Crime Description',
      'Arrest',
      'Longitude',
      'Latitude',
      'Date'
    ];

    this.censusBlockColumns = [
      'ID',
      'geom'
    ];

    this.censusInformationColumns = [
      'Block Id',
      'Deprevation Index'
    ];

    this.dataType = this.fileUploadService.getDataType();

    if (this.dataType === 'Criminal Data')
    {
      this.columns = this.criminalColumns;
    }
    else if (this.dataType === 'Census Blocks') {
      this.columns = this.censusBlockColumns;
    }
    else if (this.dataType === 'Census Information') {
      this.columns = this.censusInformationColumns;
    }

    this.fileData = this.fileUploadService.getData();

  }

  ngAfterViewInit() {
    this.columnMappingView = document.getElementById('columnMapping');
    this.dataPreviewView = document.getElementById('dataPreview');

    this.displayMapping();
  }

  public columnMappingObjectUpdate(name: string, value: string) {
    this.columnMappings[name] = value;
    this.fileUploadService.setColumnMappings(this.columnMappings);
  }

  public displayMapping(): void {
    this.columnMappingView.style.display = 'block';
    this.dataPreviewView.style.display = 'none';
  }

  public importCensusBorders(): void {
    this.fileUploadService.importCensusBorders();
  }
  public displayPreview(): void {
    this.columnMappingView.style.display = 'none';
    this.dataPreviewView.style.display = 'block';
  }
}
