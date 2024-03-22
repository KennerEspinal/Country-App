import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit{
  public countries: Country[] = [];
  public isLoaded: boolean = false;
  public initialValue: string = '';

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCapital.countries;
    this.initialValue = this.countryService.cacheStore.byCapital.term;
  }

  searchByCapital(capital: string): void {
    this.isLoaded = true;
    this.countryService.searchCapital(capital)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoaded = false;
      })
  }


}
