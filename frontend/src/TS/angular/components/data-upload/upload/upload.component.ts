import { Component, OnInit } from '@angular/core';

// --------------- SERVICES ---------------
import { FileUploadService } from '../../../services/file-upload.service';

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
  public defaulDelimiter: string;

  constructor(private fileUploadService: FileUploadService) {
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

    this.defaulDelimiter = ',';
  }

  ngOnInit() {
    this.stopSpinner();
  }

  public showContent(): void {
    document.getElementById('dropdownMenuContent').style.display = 'block';
    let button = document.getElementById('fileTypeButton');
    button.classList.remove('fileTypeButtonClosed');
    button.classList.add('fileTypeButtonOpen');
  }

  public hideContent(): void {
    document.getElementById('dropdownMenuContent').style.display = 'none';
    let button = document.getElementById('fileTypeButton');
    button.classList.remove('fileTypeButtonOpen');
    button.classList.add('fileTypeButtonClosed');
  }

  public triggerFileUpload(): void {
    let fileUploadInput = <HTMLInputElement> document.getElementById('fileUploadInput');
    fileUploadInput.click();
  }

  public updateSelectedFiles(event): void {
    this.files = event.target.files;
    this.selectedFile = this.files[0].name;
  }

  public uploadFile(): void {

    if (this.files) {
      this.startSpinner();
      this.errorMessage = ''
      this.fileUploadService.postFile(this.files[0])
      .then(json => this.stopSpinner());
    }
    else {
      this.errorMessage = 'Select a file to upload.'
    }
  }

  public selectedFileTypeChange(type): void {
    this.selectedFileType = type;
    console.log(this.selectedFileType);
  }

  public updateSelectedDataType(type): void {
    this.selectedDataType = type;
    this.hideContent();
  }

  private startSpinner() {
    let uploadText = document.getElementById('uploadText');
    let uploadSpinner = document.getElementById('uploadSpinner');

    uploadText.style.display = 'none';
    uploadSpinner.style.display = 'block';
  }

  private stopSpinner() {
    let uploadText = document.getElementById('uploadText');
    let uploadSpinner = document.getElementById('uploadSpinner');

    uploadText.style.display = 'block';
    uploadSpinner.style.display = 'none';
  }
}
