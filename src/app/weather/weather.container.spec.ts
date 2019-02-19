import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherContainerComponent } from './weather.container';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeatherModule } from './weather.module';
import { AppState } from '../model/appState';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Settings } from './settings';
import { Weather } from '../model/weather';
import { GetCityForecastAction, AddCityForecastAction } from './store/actions/weather';
import 'rxjs/add/observable/of';
import { WeatherForecast } from '../model/weatherForecast';

describe('WeatherContainer', () => {
  let component: WeatherContainerComponent;
  let fixture: ComponentFixture<WeatherContainerComponent>;
  let store: Store<AppState>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        WeatherModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(WeatherContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('citySearch', () => {
    it('should dispatch an action to get city forecast', () => {
      // Arrange
      const city = 'Seattle';
      const fakeForecastReponse: Weather = {};
      const expectedAction = new GetCityForecastAction(city);
      // Act
      /*
         We could probably trigger the call to citySearch via inputing
         into the textbox and triggering click on the button
         but as we simply unit testing the container component, calling the citySearch method directly

      */
      component.citySearch(city);

      // Assert
      const req = httpMock.expectOne(Settings.buildWeatherServiceUrl(city));
      req.flush(fakeForecastReponse);
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should not dispatch an action if city forecast already exists in the store', () => {
      // Arrange
      const city = 'Seattle';
      const cityForecastAction = new GetCityForecastAction(city);
      const existingCityForecast: WeatherForecast = {city, quaterHourForecast: []};
      store.dispatch(new AddCityForecastAction(existingCityForecast));

      // Act
      component.citySearch(city);

      // Assert
      expect(store.dispatch).not.toHaveBeenCalledWith(cityForecastAction);
    });
  });


});
