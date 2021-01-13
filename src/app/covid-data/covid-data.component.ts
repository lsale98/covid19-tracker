import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { ICovidData } from '../models/CovidData';
import { CovidService } from '../services/covid.service'; 
import { LoaderService } from '../services/loader.service';
@Component({
  selector: 'app-covid-data',
  templateUrl: './covid-data.component.html',
  styleUrls: ['./covid-data.component.scss']
})
export class CovidDataComponent implements OnInit {

  options: any;
  color: ThemePalette = 'accent';
  currentIso2: string;

  covidData: ICovidData;

  cases: Array<number> = [];
  recovered: Array<number> = [];
  deaths: Array<number> = [];

  constructor(private covidService: CovidService, private route: ActivatedRoute, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentIso2 = params.get('iso2');
    });
    this.getDataForCountry();
    this.generateChart();
   
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

  generateChart() {
    this.covidService.getData30Days().subscribe(response => {
      let casesData = response.body.timeline.cases;
      let recoveredData = response.body.timeline.recovered;
      let deathsData = response.body.timeline.deaths;

      const cKeys = Object.keys(casesData);

      cKeys.forEach(key => {
        this.cases.push(casesData[key]);
      });

      const rKeys = Object.keys(recoveredData);

      rKeys.forEach(key => {
        this.recovered.push(recoveredData[key]);
      });

       const dKeys = Object.keys(deathsData);

      dKeys.forEach(key => {
        this.deaths.push(deathsData[key]);
      });
     
      
    
    });
    const xAxisData = ['Week 1','Week 2','Week 3','Week 4'];

  

    this.options = {
      legend: {
        data: ['Cases', 'Recovered', 'Deaths'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: true,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        
      },
      series: [
        {
          name: 'Cases',
          type: 'bar',
          data: this.cases,
          animationDelay: (idx) => idx * 10,
        },
          {
          name: 'Recovered',
          type: 'bar',
          data: this.recovered,
          animationDelay: (idx) => idx * 10 + 100,
        },
         {
          name: 'Deaths',
          type: 'bar',
          data: this.deaths,
          animationDelay: (idx) => idx * 10 + 100,
        },
      
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

}
