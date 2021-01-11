import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '../models/Country';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  readonly API_BASE = "https://disease.sh/v3/covid-19/countries";

  constructor(private http: HttpClient) { }

  getCountries(): Observable<HttpResponse<any>>{
    return this.http.get<ICountry>(this.API_BASE, {observe: 'response'});
  }
}
