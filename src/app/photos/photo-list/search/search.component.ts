import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html'
})
export class SearchComponent{
  debounce: Subject<string> = new Subject<string>();
  @Output() onTyping = new EventEmitter();
  @Input() filter = '';

  ngOnInit(): void {
    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
}
