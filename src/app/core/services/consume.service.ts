import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap, mergeMap, map } from 'rxjs/operators';

import { Consume } from '@core/models/consume.model';
import { HttpService } from '@core/services/shared/http.service';
import { CategoryService } from '@core/services/category.service';


@Injectable({
  providedIn: 'root'
})
export class ConsumeService {

  consumes$: Observable<Consume[]>;

  private urls = {
    consume: 'consume',
  };

  constructor(
    private httpService: HttpService,
    private categoryService: CategoryService,
  ) { }

  getConsumes(): Observable<Consume[]> {
    // return this.httpService.get<Consume[]>(this.urls.consume);

    // mock
    return this.httpService.get<Consume[]>(this.urls.consume).pipe(
      switchMap(consumes => of(consumes).pipe(
        mergeMap(consume => this.categoryService.getCategories()),
        map(categories => categories.map(category => category.id)),
        map(categories => consumes.filter(consume => categories.indexOf(consume.category) !== -1)),
      )),
    );
  }

  getConsumesFromBook(book: number): Observable<Consume[]> {
    this.consumes$ = this.getConsumes().pipe(
      switchMap(consumes => of(consumes).pipe(
        mergeMap(consume => this.categoryService.getCategories()),
        map(categories => categories.filter(category => category.book === book)),
        map(categories => categories.map(category => category.id)),
        map(categories => consumes.filter(consume => categories.indexOf(consume.category) !== -1)),
      )),
      shareReplay(1),
    );
    return this.consumes$;
  }

  getConsume(id: number): Observable<Consume> {
    return this.httpService.get<Consume>(`${this.urls.consume}/${id}`);
  }

  createConsume(consume: Consume): Observable<Consume> {
    return this.httpService.post<Consume>(this.urls.consume, consume);
  }

  updateConsume(id: number, consume: Consume): Observable<Consume> {
    return this.httpService.patch<Consume>(`${this.urls.consume}/${id}`, consume);
  }

  partialUpdateConsume(id: number, consume: Consume): Observable<Consume> {
    return this.httpService.patch<Consume>(`${this.urls.consume}/${id}`, consume);
  }

  deleteConsume(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.consume}/${id}`);
  }
}
