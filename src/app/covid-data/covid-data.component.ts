import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICovidData } from '../models/CovidData';
import { CovidService } from '../services/covid.service'; 
@Component({
  selector: 'app-covid-data',
  templateUrl: './covid-data.component.html',
  styleUrls: ['./covid-data.component.scss']
})
export class CovidDataComponent implements OnInit {

  currentIso2: string;

  covidData: ICovidData;

  constructor(private covidService: CovidService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentIso2 = params.get('iso2');
    });
    this.getDataForCountry();
   
  }

  getDataForCountry() {
    this.covidService.getDataForCountry(this.currentIso2).subscribe(response => {
      const country = response.body;

      this.covidData = {
        name: country.country,
        flag: country.countryInfo.flag,
        continent: country.continent,
        cases: country.cases,
        todayCases: country.todayCases,
        recovered: country.recovered,
        todayRecovered: country.todayRecovered,
        deaths: country.deaths,
        todayDeaths: country.todayDeaths
      };
       
    });
  }

}
