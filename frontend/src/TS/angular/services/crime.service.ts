import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CriminalDataObject } from '../../interfaces/criminalDataObject';
import { FilterOptionsObject } from '../../interfaces/filterOptionsObject';

@Injectable({
  providedIn: 'root'
})
export class CrimeService {

  // Criminal data retrieved from API
  private data: Array<CriminalDataObject>;

  constructor(private http: HttpClient) { }

  getData() : Array<CriminalDataObject> {
    return this.data;
  }

  // takes in a FilterOptionsObject and turns it into a url query that can then
  // be used to send a request to the API to retrieve the criminal data matching
  // the query
  urlBuilder(filterOptions: FilterOptionsObject) : string {
    const baseUrl = 'http://127.0.0.1:8000/getCrimes?'
    let urlQuery = baseUrl;

    filterOptions.crimeTypes.forEach(type => {
      urlQuery += 'crimeType=' + type;
    });

    return urlQuery
  }

  // gets criminal data from API and adds it to the "data" variable
  update(filterOptions: FilterOptionsObject) : void {
    const url = this.urlBuilder(filterOptions);

    this.http.get(url).subscribe((data: Array<CriminalDataObject>) => this.data = data);
  }
}
