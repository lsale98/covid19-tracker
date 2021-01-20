import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '../models/Country';
import { ITopCountry } from '../models/TopCountry';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  readonly API_BASE = "https://disease.sh/v3/covid-19/countries";

  constructor(private http: HttpClient) { }

  getCountries(): Observable<HttpResponse<any>>{
    return this.http.get<ICountry[]>(this.API_BASE, {observe: 'response'});
  }

  getCountriesTop10(): Observable<HttpResponse<any>>{
    return this.http.get<ITopCountry>(this.API_BASE, {observe: 'response'});
  }
}
