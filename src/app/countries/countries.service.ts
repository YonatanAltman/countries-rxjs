import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, of, ReplaySubject, tap} from 'rxjs';
import {Country} from './countries.interface';
import {convertCountryApiToCountry} from './countries.utils';

const API_URL = 'https://restcountries.com/v3.1/'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private httpClient = inject(HttpClient);
  private readonly _countries$ = new ReplaySubject<Country[]>(1); // == BehaviorSubject
  private readonly _loader$ = new BehaviorSubject<boolean>(false);
  readonly #loader = signal(false);
  readonly countries$ = this._countries$.asObservable();
  readonly loader$ = this._loader$.asObservable();
  readonly loader = this.#loader.asReadonly();

  constructor() {
    this.getAllCountries();
  }

  syncCountries() {
    this.getAllCountries();
  }


  private getAllCountries(): void {
    // step 1)
    this._loader$.next(true);

    // step 2)
    this.httpClient.get(API_URL + 'all').pipe(
      // step 3)
      catchError((err) => {
        console.error(err);
        return of([])
      }),
      // step 4)
      map((arr: any) => {
        return arr.map((item: any) => convertCountryApiToCountry(item));
      }),
      // step 5)
      tap(() => {
        this._loader$.next(false);
      })
    ).subscribe(countries =>
      // step 6)
      this._countries$.next(countries)
    );
  }
}
