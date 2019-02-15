import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { QuaterHourForecast } from '../../../model/QuaterHourForecast';
import { WeatherForecast } from '../../../model/weatherForecast';

export const GET_CITY_FORECAST = '[Weather] Get City Forecast';
export const ADD_CITY_FORECAST = '[Weather] Add City Forecast';
export const GET_CITY_FORECAST_ERROR = '[Weather] Get City Forecast Error';

export class AddCityForecastAction implements Action {

    public readonly type: string = ADD_CITY_FORECAST;
    public readonly payload: WeatherForecast;

    constructor(payload: WeatherForecast) {
        this.payload = payload;
    }
}

export class GetCityForecastAction implements Action {
    public readonly  type: string = GET_CITY_FORECAST;
    public readonly payload: string;

    constructor(city: string) {
        this.payload = city;
    }
}

export class GetCityForecastError implements Action {
    readonly type = GET_CITY_FORECAST_ERROR;
}

@Injectable()
export class WeatherActions {

  getCityForecast(city): GetCityForecastAction {
    return new GetCityForecastAction(city);
  }

  addCityForecast(city: string, forecast: QuaterHourForecast[]): AddCityForecastAction {
    return new AddCityForecastAction({city, quaterHourForecast: forecast});
  }
}
