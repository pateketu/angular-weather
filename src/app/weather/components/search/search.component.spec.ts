import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SearchComponent } from './search.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('entering city name and clicking on search button emit\'s search event', async () => {
    let result: string;
    // Arrange
    const searchTerm = 'Seattle';
    component.search.subscribe((value) => result = value);
    const cityInputElement = fixture.debugElement.query(By.css('#city'));
    const buttonElement = fixture.debugElement.query(By.css('.btn-search'));
    cityInputElement.nativeElement.value = searchTerm;
    cityInputElement.triggerEventHandler('input', {
       target: cityInputElement.nativeElement
    });

    // Act
    buttonElement.triggerEventHandler('click', null);

    // Assert
    expect(result).toBe(searchTerm);
  });

  it('clicking on search button without search term, shows validation error', async () => {
    // Arrange
    const buttonElement = fixture.debugElement.query(By.css('.btn-search'));
    const cityInputElement = fixture.debugElement.query(By.css('#city'));

    // Act
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(cityInputElement.classes['is-invalid']).toBe(true);
  });

  it('setting searchError to true shows error alert', () => {
    // Arrange
    component.searchError = true;
    fixture.detectChanges();
    // Assert
    expect(fixture.debugElement.query(By.css('.alert'))).toBeTruthy();

  });
});
