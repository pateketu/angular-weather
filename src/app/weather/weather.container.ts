import { Component, OnInit } from '@angular/core';
import { WeatherActions } from './store/actions/weather';
import { AppState } from '../model/appState';
import { Store } from '@ngrx/store';
import * as selectors from './store/selectors/weather';
import { WeatherForecast } from '../model/weatherForecast';

@Component({
  selector: 'app-weather',
  template: `
  <app-search (search)="citySearch($event)" [searchError]="searchError"></app-search>
  <app-results [forecast]="forecast"></app-results>  `
})

export class WeatherContainerComponent implements OnInit {

  public forecast: WeatherForecast[];
  public searchError: boolean;
  private currentCities: string[];

  constructor(private store: Store<AppState>,
    private weatherActions: WeatherActions) {

  }
  ngOnInit(): void {
    this.store.select(selectors.citiesForecast)
      .subscribe((forecast: WeatherForecast[]) => {
       this.forecast = forecast;
    });

    this.store.select(selectors.cities)
      .subscribe((cities: string[]) => {
        this.currentCities = cities.map(c => c.toLocaleLowerCase());
    });

    this.store.select(selectors.citySearchError)
      .subscribe((error: boolean) => {
        this.searchError = error;
    });

  }
  citySearch(city: string) {

    // May be this logic could be in Effect
    if (this.currentCities.indexOf(city.toLocaleLowerCase()) >= 0) {
      return;
    }

    this.store.dispatch(this.weatherActions.getCityForecast(city));
  }
}
