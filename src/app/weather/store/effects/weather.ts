import { GET_CITY_FORECAST, WeatherActions,  GetCityForecastAction, GetCityForecastError } from '../actions/weather';
import { WeatherService } from '../../weather.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { QuaterHourForecast } from '../../../model/quaterHourForecast';

@Injectable()
export class WeatherEffects {
    constructor(
        private weatherActions: WeatherActions,
        private actions$: Actions,
        private weatherService: WeatherService
      ) {}

      @Effect()
      getForecastForCity$ = this.actions$.pipe(
          ofType(GET_CITY_FORECAST),
          map((action: GetCityForecastAction) => action.payload),
          mergeMap((city: string) => this.weatherService.searchWeatherForCity(city)
                    .pipe(
                            map((forecast: QuaterHourForecast[]) =>
                                        this.weatherActions.addCityForecast(city, forecast)),
                            catchError(() => of(new GetCityForecastError()))
                         )
          ));
}
