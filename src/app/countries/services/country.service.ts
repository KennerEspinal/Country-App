import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryByCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.baseUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(capital: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/capital/${capital}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  searchCountry(name: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/name/${name}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/region/${region}`)
      .pipe(
        catchError(() => of([]))
      );
  }

}
