import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../model/appState';
import { WeatherForecast } from '../../../model/weatherForecast';
import { QuaterHourForecast } from '../../../model/quaterHourForecast';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})

export class ResultsComponent implements OnChanges {
  @Input() forecast: WeatherForecast[];

  public quaterTimeSlots: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.forecast &&
        changes.forecast.currentValue &&
        changes.forecast.currentValue.length > 0
        && this.quaterTimeSlots.length === 0) {

          // This logic does not work if App is left open for more than 3 hours and city search is made
          // as the next 24 hours quater times slots would have changed

          // This could ideally be an @Input) and container provides the data
          this.quaterTimeSlots = this.forecast[0]
                                     .quaterHourForecast
                                     .map((q: QuaterHourForecast) => q.time.toLocaleUpperCase());
    }
  }

  trackByCity(index: number, forecast: WeatherForecast) {
      return forecast.city;
  }

  trackByQuaterTime(index: number, q: QuaterHourForecast) {
    return q.time;
  }
}


