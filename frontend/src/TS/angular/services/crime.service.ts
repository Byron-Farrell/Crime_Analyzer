// --------------- ANGULAR ---------------
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

// -------------- INTERFACES --------------
import { CriminalDataObject } from '../../interfaces/criminalDataObject';
import { FilterOptionsObject } from '../../interfaces/filterOptionsObject';

@Injectable({
  providedIn: 'root'
})
export class CrimeService {

  private dataSubject: Subject<CriminalDataObject>;
  private dataObservable;
  private crimeTypes: Array<string>;
  private baseURL: string;
  private getCrimesURL: string;
  private getCrimeTypesURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'http://127.0.0.1:8000/';
    this.getCrimesURL = 'getCrimes?';
    this.getCrimeTypesURL = 'getCrimeTypes';

    this.dataSubject = new Subject<CriminalDataObject>();
    this.dataObservable = this.dataSubject.asObservable();
  }

  getCrimeTypes(): Array<string> {
    return this.crimeTypes;
  }

  getObservable(): Observable<any> {
    return this.dataObservable;
  }

  // takes in a FilterOptionsObject and turns it into a url query string that
  // can then be used to send a request to the API to retrieve the criminal
  // data matching the query
  private urlBuilder(filterOptions: FilterOptionsObject) : string {
    let urlQuery = this.baseURL + this.getCrimesURL;

    filterOptions.crimeTypes.forEach(type => {
      urlQuery += 'crimeType=' + type + '&';
    });

    return urlQuery
  }

  // gets criminal data from API and adds it to the "data" variable
  // this function will return a promise that will be resolved once the all data
  // is retrieved
  loadCrimeData(filterOptions: FilterOptionsObject) : void {
    const url = this.urlBuilder(filterOptions);

    fetch(url)
      .then((data: any) => data.json())
      .then(json => this.dataSubject.next(json))
      .catch(error => console.error(error));
  }

  loadCrimeTypes(): Promise<any> {
    let url = this.baseURL + this.getCrimeTypesURL;

    return new Promise(function(resolve, reject) {
      fetch(url)
        .then(data => data.json())
        .then(json => resolve(json))
        .catch(error => reject(error));
    });
  }
}
