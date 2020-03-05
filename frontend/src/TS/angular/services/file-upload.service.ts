import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private BASE_URI: string;
  private CRIME_URI: string;
  private FILE_CRIME_TYPES: string;
  private FILE_ARREST_VALUES: string;

  private data: any;
  private fileType: string;
  private dataType: string;
  private delimiter: string;
  private columnMappings: any;

  constructor() {
    this.BASE_URI = 'http://127.0.0.1:8000/';
    this.CRIME_URI = 'uploadCriminalDataFile';
    this.FILE_CRIME_TYPES = 'getFileCrimeTypes';
    this.FILE_ARREST_VALUES = 'getFileArrestValues';
    this.columnMappings = {};
  }

  public getColumnMappings(): any {
    return { ...this.columnMappings };
  }

  public getData(): any {
    return { ...this.data };
  }

  public getFileType(): string {
    return this.fileType;
  }

  public getDataType(): string {
    return this.dataType;
  }

  public getDelimiter(): string {
    return this.delimiter;
  }

  public setColumnMappings(mappingObj: any): void {
    this.columnMappings = { ...mappingObj };
  }

  public setFileType(fileType: string): void {
    this.fileType = fileType;
  }

  public setDataType(dataType: string): void {
    this.dataType = dataType;
  }

  public setDelimiter(newDelimiter: string) {
    this.delimiter = newDelimiter;
  }

  public getFileCrimeTypes(): Promise<any> {
    const uriQuery = '?fileName=' + this.data.file_name + '&crimeTypeCol=' + this.columnMappings['Crime Type']
    const uri = this.BASE_URI + this.FILE_CRIME_TYPES + uriQuery;

    return new Promise((resolve, reject) => {
      fetch(uri)
        .then(response => response.json())
        .then(json => resolve(json['crimeTypes']))
        .catch(error => reject(error));
    })
  }

  public getFileArrestValues(): Promise<any> {
    const uriQuery = '?fileName=' + this.data.file_name + '&arrestValuesCol=' + this.columnMappings['Arrest']
    const uri = this.BASE_URI + this.FILE_ARREST_VALUES + uriQuery;

    return new Promise((resolve, reject) => {
      fetch(uri)
        .then(response => response.json())
        .then(json => resolve(json['arrestValues']))
        .catch(error => reject(error));
    })
  }

  public postFile(file): Promise<any> {
    let uri = this.BASE_URI + this.CRIME_URI;
    let data = new FormData();

    data.append('uploadFile', file, file.name);


    return new Promise( (resolve, reject) => {
      let csrfToken: string;

      try {
        csrfToken = this.getCookie('csrftoken');
      }
      catch(error) {
        reject(error)
      }

      fetch(uri, {
        method: 'POST',
        // mode: 'cors',
        cache: 'no-cache',
        // credentials: 'same-origin',
        credentials: 'include',
        headers: {

          'X-CSRFToken': csrfToken
        },
        body: data
      })
      .then(response => response.json())
      .then(json => {
        this.data = json;
        resolve({status: 'success'});
      })
      .catch(error => reject(error));
    });
  }

  // The function below was copied from stack overflow
  // link: https://stackoverflow.com/questions/40893537/fetch-set-cookies-and-csrf
  private getCookie(name): string {
    if (!document.cookie) {
      throw new Error('Cookie with name(' + name + ') does not exist!');
    }

    const xsrfCookies = document.cookie.split(';')
    .map(c => c.trim())
    .filter(c => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
      throw new Error('No cookies found!');
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }
}
