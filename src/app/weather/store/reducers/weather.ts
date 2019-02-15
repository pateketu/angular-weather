import { WeatherState } from '../../../model/appState';
import { Action } from '@ngrx/store';
import {ADD_CITY_FORECAST, AddCityForecastAction, GET_CITY_FORECAST_ERROR} from '../actions/weather';

export const inittialState: WeatherState = {citySearchErrors: false, cityForecast: []};

export function WeatherReducer(state: WeatherState = inittialState, action: Action): WeatherState {
    switch (action.type) {
      case ADD_CITY_FORECAST:
            const addCityForecastAction: AddCityForecastAction = action as AddCityForecastAction;
            return {...state, cityForecast: [...state.cityForecast, addCityForecastAction.payload]};
      case GET_CITY_FORECAST_ERROR:
            return {...state, citySearchErrors: true};
        default:
            return state;
    }
}
