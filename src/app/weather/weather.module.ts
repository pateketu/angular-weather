import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherContainerComponent } from './weather.container';
import { WeatherService } from './weather.service';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { StoreModule } from '@ngrx/store';
import { WeatherReducer } from './store/reducers/weather';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherActions } from './store/actions/weather';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './store/effects/weather';
import { HttpClientModule } from '@angular/common/http';
export const storeModule = StoreModule.forRoot({ weather: WeatherReducer });

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('weather', WeatherReducer),
    EffectsModule.forFeature([WeatherEffects])
  ],
  declarations: [
    SearchComponent,
    ResultsComponent,
    WeatherContainerComponent
  ],
  providers: [
    WeatherService,
    WeatherActions
  ]
})
export class WeatherModule {
}
