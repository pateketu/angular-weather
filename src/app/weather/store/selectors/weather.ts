import { AppState, WeatherState } from '../../../model/appState';
import { createSelector } from '@ngrx/store';

const weather = (state: AppState) => state.weather;

export const citiesForecast = createSelector(
    weather,
    (state: WeatherState) => state.cityForecast
 );

export const cities =  createSelector(
    weather,
    (state: WeatherState) => state.cityForecast.map(c => c.city)
);

export const citySearchError = createSelector(
    weather,
    (state: WeatherState) => state.citySearchErrors
);
