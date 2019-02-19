import { async, TestBed } from '@angular/core/testing';
import { WeatherModule } from '../../weather.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
/*

Have never worekd with ngRx Effects, I understrand the concept fully
as have done lot of work with thunk
ngRx has rubbish documenation on unit testing @Effect
some of the older blog's that use EffecTestingModule is not longer valid in newer version

Hence Skipping test implementation, time permitted can get to the bottom of it!
*/
describe('WeatherEffect', () => {
    let httpMock: HttpTestingController;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule,
            StoreModule.forRoot({}),
            EffectsModule.forRoot([]),
            WeatherModule
          ]
        });

      }));

    beforeEach(() => {
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    xdescribe('$getForecastForCity$', () => {
        it('returns AddCityForecastAction on success', () => {
            // const  fakeForecastReponse: WeatherForecast = {city: 'fff', quaterHourForecast: []};
            // const sub = weatherEffect.getForecastForCity$.subscribe(result => {
            //   // expect(result).toEqual(AddCityForecastAction);
            //   done();
            //   setTimeout(() => sub.unsubscribe());
            // });

            // store.dispatch(new GetCityForecastAction('fff'));
            // const req = httpMock.expectOne(Settings.buildWeatherServiceUrl('fff'));
            // req.flush(fakeForecastReponse);

        });

        it('returns GetCityForecastError on error', () => {
            // const  a = new ReplaySubject(1);

            // a.next(GetCityForecastAction);

            // weatherEffect.getForecastForCity$.subscribe(result => {
            //   expect(result).toEqual(GetCityForecastError);
            // });
        });
    });
});
