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

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.columns = [
      'Crime Type',
      'Crime Description',
      'Arrest',
      'Longitude',
      'Latitude',
      'Date'
    ]
    this.fileData = this.fileUploadService.getData();

  }


}
