import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private BASE_URI: string;
  private CRIME_URI: string;

  private data: any;
  private fileType: string;
  private dataType: string;
  private delimiter: string;

  constructor() {
    this.BASE_URI = 'http://127.0.0.1:8000/';
    this.CRIME_URI = 'uploadCriminalDataFile';
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

  public getDelimiter() {
    return this.delimiter;
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
