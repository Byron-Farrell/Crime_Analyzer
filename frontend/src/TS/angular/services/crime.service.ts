// --------------- ANGULAR ---------------
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

// -------------- INTERFACES --------------
import { CriminalDataObject } from '../../interfaces/criminalDataObject';
import { AnalyticsDataObject } from '../../interfaces/analyticsDataObject';
import { FilterOptionsObject } from '../../interfaces/filterOptionsObject';

@Injectable({
  providedIn: 'root'
})
export class CrimeService {

  private mapDataSubject: Subject<CriminalDataObject>;
  private analyticsDataSubject: Subject<AnalyticsDataObject>;
  private mapDataObservable;
  private analyticsDataObservable;
  private crimeTypes: Array<string>;

  private baseURL: string;
  private getCrimesURL: string;
  private getCrimeTypesURL: string;
  private getWeatherTypesURL: string;
  private getMoonTypesURL: string;
  private getCitiesURL: string;
  private getAnalyticsURL: string;
  private limit: number;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://nameless-island-09470.herokuapp.com/';
    this.getCrimesURL = 'getCrimes?';
    this.getCrimeTypesURL = 'getCrimeTypes';
    this.getWeatherTypesURL = 'getWeatherTypes';
    this.getMoonTypesURL = 'getMoonTypes';
    this.getCitiesURL = 'getCityNames';
    this.getAnalyticsURL ='getAnalytics?';

    this.mapDataSubject = new Subject<CriminalDataObject>();
    this.analyticsDataSubject = new Subject<AnalyticsDataObject>();
    this.mapDataObservable = this.mapDataSubject.asObservable();
    this.analyticsDataObservable = this.analyticsDataSubject.asObservable();

    this.limit = 500;
  }

  getCrimeTypes(): Array<string> {
    return this.crimeTypes;
  }

  getMapObservable(): Observable<any> {
    return this.mapDataObservable;
  }

  getAnalyticsObservable(): Observable<any> {
    return this.analyticsDataObservable;
  }

  // takes in a FilterOptionsObject and turns it into a url query string that
  // can then be used to send a request to the API to retrieve the criminal
  // data matching the query
  private mapUrlBuilder(filterOptions: FilterOptionsObject): string {
    let urlQuery = this.baseURL + this.getCrimesURL;

    filterOptions.cities.forEach(type => {
      urlQuery += 'city=' + type + '&';
    });

    filterOptions.crimeTypes.forEach(type => {
      urlQuery += 'crimeType=' + type + '&';
    });

    filterOptions.weatherTypes.forEach(type => {
      urlQuery += 'weatherType=' + type + '&';
    });

    filterOptions.moonTypes.forEach(type => {
      urlQuery += 'moonPhase=' + type + '&';
    });

    filterOptions.isDark.forEach(type => {
      urlQuery += 'isDark=' + type + '&';
    });

    urlQuery += 'startDate=' + filterOptions.startDate + '&';

    urlQuery += 'endDate=' + filterOptions.endDate + '&';

    urlQuery += 'cloudCoverMin=' + filterOptions.cloudCover.min + '&';

    urlQuery += 'cloudCoverMax=' + filterOptions.cloudCover.max + '&';

    urlQuery += 'degreesMax=' + filterOptions.degrees.max + '&';

    urlQuery += 'degreesMin=' + filterOptions.degrees.min + '&';

    urlQuery += 'precipitationMax=' + filterOptions.precipitation.max + '&';

    urlQuery += 'precipitationMin=' + filterOptions.precipitation.min + '&';

    return urlQuery;
  }

  private analyticsUrlBuilder(filterOptions: FilterOptionsObject): string {
    let urlQuery = this.baseURL + this.getAnalyticsURL;

    filterOptions.cities.forEach(type => {
      urlQuery += 'city=' + type + '&';
    });

    filterOptions.crimeTypes.forEach(type => {
      urlQuery += 'crimeType=' + type + '&';
    });

    urlQuery += 'startDate=' + filterOptions.startDate + '&';

    urlQuery += 'endDate=' + filterOptions.endDate + '&';

    return urlQuery;
  }
  // gets criminal data from API and adds it to the "data" variable
  // this function will return a promise that will be resolved once the all data
  // is retrieved
  loadCrimeData(filterOptions: FilterOptionsObject): void {
    const url = this.mapUrlBuilder(filterOptions);

    // // let crimeCount: number;
    // // let remainder: number;
    // // let queryCount: number;
    //
    // // get count
    //
    // fetch(url + 'count=true')
    //   .then(data => data.json())
    //   .then(json => json.count)
    //   .then(count => {
    //     let remainder = count % this.limit;
    //     let queryCount = count === 0 ? 0 : ( ( count - remainder ) / this.limit ) + 1;
    //     let requestsRecieved = 0;
    //     let queryResult = Array();
    //     console.log(count);
    //
    //     for (let i = 0; i < queryCount; i++) {
    //       console.log(i);
    //
    //       fetch(url + 'offset=' + i * this.limit + '&limit=' + this.limit)
    //         .then(data => data.json())
    //         .then(json => {
    //           console.log('recieved: ' + requestsRecieved + 'total: ' + queryCount);
    //
    //           queryResult = queryResult.concat(json);
    //
    //           requestsRecieved += 1;
    //
    //           if (requestsRecieved === queryCount) {
    //             console.log(queryResult);
    //           }
    //         })
    //     }
    //
    //     // while (requestsRecieved !== queryCount) {
    //     //   console.log('recieved: ' + requestsRecieved + ' out of ' + queryCount);
    //     //
    //     // }
    //   })

    fetch(url)
      .then((data: any) => data.json())
      .then(json => this.mapDataSubject.next(json))
      .catch(error => console.error(error));
  }

  loadAnalytics(filterOptions: FilterOptionsObject): void {
    const url = this.analyticsUrlBuilder(filterOptions);

    fetch(url)
      .then((data: any) => data.json())
      .then(json => this.analyticsDataSubject.next(json))
      .catch(error => console.error(error));
  }

  loadCrimeTypes(): Promise<any> {
    return this.loadTypes(this.getCrimeTypesURL);
  }

  loadWeatherTypes(): Promise<any> {
    return this.loadTypes(this.getWeatherTypesURL);
  }

  loadMoonTypes(): Promise<any> {
    return this.loadTypes(this.getMoonTypesURL);
  }

  loadCities(): Promise<any> {
    return this.loadTypes(this.getCitiesURL);
  }

  private loadTypes(URL): Promise<any> {
    let url = this.baseURL + URL;

    return new Promise(function(resolve, reject) {
      fetch(url)
        .then(data => data.json())
        .then(json => resolve(json))
        .catch(error => reject(error));
    });
  }
}
