import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { 
    this.loadFromLocalStorage();
  }

  private setToLocalStorige() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getHttpCountry(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      );
  }

  searchCountryByCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.baseUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url = `${this.baseUrl}/capital/${capital}`;
    return this.getHttpCountry(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term: capital, countries }),
        tap(() => this.setToLocalStorige())
      );
  }

  searchCountry(name: string): Observable<Country[]> {
    const url = `${this.baseUrl}/name/${name}`;
    return this.getHttpCountry(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term: name, countries }),
        tap(() => this.setToLocalStorige())
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.baseUrl}/region/${region}`;
    return this.getHttpCountry(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.setToLocalStorige())
      );
  }

}
