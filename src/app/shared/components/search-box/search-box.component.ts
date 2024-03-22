import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>();

  @Input({ required: true }) placeholder!: string;
  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    })
  }

  emitValue(value: string) {
    this.onValue.emit(value);
  }

  onKeyPress(searchValue: string) {
    this.debouncer.next(searchValue);
  }
}
