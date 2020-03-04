import { Component, OnInit } from '@angular/core';

// --------------- SERVICES ---------------
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-data-mapping',
  templateUrl: './data-mapping.component.html',
  styleUrls: ['./data-mapping.component.scss']
})
export class DataMappingComponent implements OnInit {

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
    let temp = this.fileUploadService.getColumnMappings();
    console.log(temp);

  }

}
