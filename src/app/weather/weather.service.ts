import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Weather } from '../model/weather';
import { QuaterHourForecast } from '../model/quaterHourForecast';
import { Settings } from './settings';
@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) { }

  searchWeatherForCity(city): Observable<QuaterHourForecast[]> {

    return this.http.get<Weather>(Settings.buildWeatherServiceUrl(city)).pipe(
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
