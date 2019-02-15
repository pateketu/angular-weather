import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Input() searchError: boolean;
  @Output() search = new EventEmitter<string>();

  public city: FormControl = new FormControl('', Validators.required);
  public hasErrors = false;

  searchClick() {
    this.hasErrors = !this.city.valid;
    if (!this.hasErrors ) {
      this.search.emit(this.city.value);
    }
  }

  clearError() {
    this.hasErrors = false;
  }

}
