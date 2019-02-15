import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Weather } from '../model/weather';
import { QuaterHourForecast } from '../model/quaterHourForecast';
@Injectable()
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
    APPID: '010721642521f31b0fbc8c3831d45951'
  };

  constructor(private http: HttpClient) { }

  searchWeatherForCity(city): Observable<QuaterHourForecast[]> {
    this.params.q = city;
    const apiParams = Object.keys(this.params)
                          .map(key => `${key}=${this.params[key]}`)
                          .join('&');

    return this.http.get<Weather>(`${this.url}?${apiParams}`).pipe(
        map((resp: Weather) => {
            return resp.list.map(l => ({
              time: this.toAmPmTime(l.dt),
              temprature: l.main.temp
            }));
        })
    );
  }

  /*
    this function probably belongs to some utility/helper static class
    Inspired by http://esqsoft.com/javascript_examples/date-to-epoch.htm &
    https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
  */
  toAmPmTime(epoch: number) {
    if (epoch < 10000000000) { epoch *= 1000; }
    const date = new Date();
    date.setTime(epoch);
    return date.toLocaleString('en-GB', { hour: 'numeric', hour12: true });
  }

}
