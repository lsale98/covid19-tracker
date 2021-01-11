import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  countries: Array<any> = [];

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.getCountries();
    console.log(this.countries);
    
  }

  getCountries(): void{
    this.countriesService.getCountries().subscribe(response => {
      console.log(response);
      let countries = response.body;
      for (let country of countries) {
        this.countries.push({
        name: country.country,
        continent: country.continent,
        flag: country.countryInfo.flag,
        iso2: country.countryInfo.iso2
      });
      }
    })
  }

}
