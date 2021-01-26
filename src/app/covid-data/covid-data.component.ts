import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { ICovidData } from '../models/CovidData';
import { CovidService } from '../services/covid.service'; 
import { CountriesService } from '../services/countries.service'; 
import { LoaderService } from '../services/loader.service';
import { ITopCountry } from '../models/TopCountry';

@Component({
  selector: 'app-covid-data',
  templateUrl: './covid-data.component.html',
  styleUrls: ['./covid-data.component.scss']
})
export class CovidDataComponent implements OnInit {

  options: any;
  // theme: string = "dark";
  color: ThemePalette = 'accent';
  currentIso2: string;

  covidData: ICovidData;

  cases: Array<number> = [];
  recovered: Array<number> = [];
  deaths: Array<number> = [];

  countries: Array<ITopCountry> = [];
  top10Countries: Array<ITopCountry> = [];

  constructor(private covidService: CovidService, private route: ActivatedRoute, public loaderService: LoaderService, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentIso2 = params.get('iso2');
    });
    this.getDataForCountry();
    this.getTopCountries();
   
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
      this.generateChart();
      
    });

  }

  generateChart() {

    this.covidService.getData120Days(this.currentIso2).toPromise().then(response => {
      let casesData = response.body.timeline.cases;
      let recoveredData = response.body.timeline.recovered;
      let deathsData = response.body.timeline.deaths;

      const cKeys = Object.keys(casesData);

      cKeys.forEach(key => {
        this.cases.unshift(casesData[key]);
      });

      const rKeys = Object.keys(recoveredData);

      rKeys.forEach(key => {
        this.recovered.unshift(recoveredData[key]);
      });

      const dKeys = Object.keys(deathsData);

      dKeys.forEach(key => {
        this.deaths.unshift(deathsData[key]);
      });
     
      
    
    }).then(() => {
        const xAxisData = [];

    for (let i = 0; i < 120; i++){
      xAxisData.unshift([i + 1]+'d Ago');
    }

    

    this.options = {
      color: ['#F03C31', '#2FD4CB', '#333'],
      
      legend: {
        data: ['Cases', 'Recovered', 'Deaths'],
        align: 'left',
      },
      tooltip: {
      },
      xAxis: {
        data: xAxisData,
        silent: true,
        splitLine: {
          show: false,
        },
         axisLabel: {
          color: '#333',
        },
      },
      yAxis: {
         axisLine: {
          show: false,
        },
        axisLabel: {
          show: false
        },
      },
      series: [
        {
          name: 'Cases',
          type: 'line',
          data: this.cases,
          animationDelay: (idx) => idx * 10,
        },
          {
          name: 'Recovered',
          type: 'line',
          data: this.recovered,
          animationDelay: (idx) => idx * 10 + 100,
        },
         {
          name: 'Deaths',
          type: 'line',
          data: this.deaths,
          animationDelay: (idx) => idx * 10 + 100,
        },
      
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
    });
  
  }

  getTopCountries(): void{
    this.countriesService.getCountriesTop10().subscribe(response => {
      let topCountries = response.body;

      for (let country of topCountries) {
        this.countries.push({
          name: country.country,
          flag: country.countryInfo.flag,
          cases: country.cases,
        });
      }

      this.top10Countries = this.countries.sort((a, b) => b.cases - a.cases).slice(0, 10);      
    });
  }

}
