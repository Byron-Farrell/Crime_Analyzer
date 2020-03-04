import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
// --------------- SERVICES ---------------
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  private files: Array<File>;
  private selectedDelimiter: string;

  public dataUploadTypes: Array<string>;
  public errorMessage: string;
  public selectedDataType: string;
  public selectedFile: string;
  public selectedFileType: string;
  public validFileTypes: Array<string>;
  public defaulDelimiter: string;

  public dropdownStyles: string;

  constructor(
    private fileUploadService: FileUploadService,
    private router: Router
  ) {
    this.setup();
  }

  ngOnInit() {
    this.stopSpinner();
  }

  private setup(): void {
    this.dropdownStyles = "btn btn-secondary w-100";
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

    this.fileUploadService.setFileType(this.selectedFileType);
    this.fileUploadService.setDataType(this.selectedDataType);
    this.fileUploadService.setDelimiter(this.defaulDelimiter);
  }

  public selectedDelimiterChange(event) {
    this.selectedDelimiter = event.target.value;
    this.fileUploadService.setDelimiter(this.selectedDelimiter);
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
      .then(json => {
        this.stopSpinner();
        this.router.navigateByUrl('upload/column-mapping');
      })
      .catch(error => {
        console.error(error);
        this.stopSpinner();
      });
    }
    else {
      this.errorMessage = 'Select a file to upload.'
    }
  }

  public selectedFileTypeChange(type): void {
    this.selectedFileType = type;
    this.fileUploadService.setFileType(type);
  }

  public updateSelectedDataType(type): void {
    this.selectedDataType = type;
    this.fileUploadService.setDataType(type);
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
