import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { ICountry } from '../models/Country';
import { LoaderService } from '../services/loader.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  color: ThemePalette = 'accent';
  isOpen: boolean = false;

  countries: Array<ICountry> = [];

  constructor(private countriesService: CountriesService,public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void{
    this.countriesService.getCountries().subscribe(response => {
      let countries = response.body;
      for (let country of countries) {
        this.countries.push({
        name: country.country,
        continent: country.continent,
        flag: country.countryInfo.flag,
        iso2: country.countryInfo.iso2,
      });
      }
    })
  }

  toogleMenu(): void{
    this.isOpen = !this.isOpen;
  }

}
