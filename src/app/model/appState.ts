import { WeatherForecast } from './weatherForecast';

export interface WeatherState {
    citySearchErrors: boolean;
    cityForecast: WeatherForecast[];
}

export interface AppState {
    weather: WeatherState;
}
