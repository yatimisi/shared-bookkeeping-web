import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { HeaderSetting } from '@core/models/header-setting.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() headers: HeaderSetting[];
  @Input() data$: Observable<any>;
  @Input() pageSizeOptions = [5, 10, 25, 100];
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() length = 100;
  @Output() dataChange$: EventEmitter<OperatorFunction<any, any>> = new EventEmitter<OperatorFunction<any, any>>();

  public objectKeys = Object.keys;
  public status = undefined;

  ngOnInit() {
    this.data$.subscribe(
      result => {
        this.length = result.length;
        this.pageEvent({
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        });
        this.status = !(this.length === 0);
      }
    );
  }

  pageEvent(event) {
    const begin = (event.pageIndex) * event.pageSize;
    const end = begin + event.pageSize;
    this.dataChange$.emit(map(organizations => organizations.slice(begin, end)));
  }

  counter(i: number) {
    return new Array(i);
  }
}
