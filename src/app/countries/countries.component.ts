import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {CountriesService} from './countries.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {Country} from './countries.interface';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountriesComponent {
  title = 'Countries';
  readonly countriesService = inject(CountriesService);
  readonly loader$ = this.countriesService.loader$;
  readonly countries$ = this.countriesService.countries$;

  constructor() {
  }

  syncCountries() {
    this.countriesService.syncCountries();
  }
}
