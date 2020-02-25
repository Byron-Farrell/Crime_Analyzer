import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  private files: Array<File>;

  public dataUploadTypes: Array<string>;
  public errorMessage: string;
  public selectedDataType: string;
  public selectedFile: string;
  public selectedFileType: string;
  public validFileTypes: Array<string>;

  constructor() {
    this.dataUploadTypes = [
      'Criminal Data',
      'Census Blocks',
      'Census Information'
    ];
    this.selectedFile = 'Select File...';
    this.selectedDataType = this.dataUploadTypes[0];

    this.validFileTypes = [
      'CSV',
    ]

    this.selectedFileType = this.validFileTypes[0];
  }

  ngOnInit() {
  }

  public showContent() {
    document.getElementById('dropdownMenuContent').style.display = 'block';
  }

  public hideContent() {
    document.getElementById('dropdownMenuContent').style.display = 'none';
  }

  public triggerFileUpload() {
    let fileUploadInput = <HTMLInputElement> document.getElementById('fileUploadInput');
    fileUploadInput.click();
  }

  public updateSelectedFiles(event) {
    this.files = event.target.files;
    this.selectedFile = this.files[0].name;
  }

  public uploadFile() {

    if (this.files) {
      this.errorMessage = ''
    }
    else {
      this.errorMessage = 'Select a file to upload.'
    }
  }

  public selectedFileTypeChange(type) {
    this.selectedFileType = type;
    console.log(this.selectedFileType);

  }
}
