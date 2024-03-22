import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

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
    return this.getHttpCountry(url);
  }

  searchCountry(name: string): Observable<Country[]> {
    const url = `${this.baseUrl}/name/${name}`;
    return this.getHttpCountry(url);
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.baseUrl}/region/${region}`;
    return this.getHttpCountry(url);
  }

}
