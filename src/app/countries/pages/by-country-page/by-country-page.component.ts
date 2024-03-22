import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor(private countryService: CountryService) { }

  searchByCountry(country: string): void {
    this.countryService.searchCountry(country)
      .subscribe(countries => {
        this.countries = countries;
      })
  }

}
