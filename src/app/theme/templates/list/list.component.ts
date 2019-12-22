import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { HeaderSetting } from '@core/models/header-setting.model';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'templates-list',
  template: `<div class="content"></div>`
})
export class ListComponent {

  headers: { [key: string]: HeaderSetting; } = {};
  source$: Observable<any[]> = new Observable();
  dataSet$: Observable<any[]> = this.source$;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
  ) { }

  detail(id: number, router = 'detail') {
    this.router.navigate(['../', id, router], { relativeTo: this.route });
  }

  add(router = 'add') {
    this.router.navigate(['../', router], { relativeTo: this.route });
  }

  onDataChange($event: any) {
    this.dataSet$ = this.source$.pipe($event);
  }
}
