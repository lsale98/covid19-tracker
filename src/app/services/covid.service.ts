import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICovidData } from '../models/CovidData';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CovidService {

  readonly BASE_API_COUNTRY = "https://disease.sh/v3/covid-19/countries/";
  readonly BASE_API_COUNTRIES = "https://disease.sh/v3/covid-19/all";
  readonly BASE_API_120 = "https://disease.sh/v3/covid-19/historical/"
  readonly BASE_API_ALL_120 = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";

  constructor(private http: HttpClient) { }

  getDataForCountry(iso2: string): Observable<HttpResponse<any>> {
    return this.http.get<ICovidData>(this.BASE_API_COUNTRY + iso2, {observe: 'response'});
  }

  getDataForAll(): Observable<HttpResponse<any>> {
    return this.http.get<ICovidData>(this.BASE_API_COUNTRIES, {observe: 'response'});
  }

  getData120Days(iso2: string): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.BASE_API_120 + iso2 + "?lastdays=120", {observe: 'response'});
  }

   getDataAll120Days(iso2: string): Observable<HttpResponse<any>>{
    return this.http.get<any>(this.BASE_API_ALL_120, {observe: 'response'});
  }
}
