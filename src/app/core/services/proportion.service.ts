import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap, mergeMap, map } from 'rxjs/operators';

import { Proportion } from '@core/models/proportion.model';
import { HttpService } from '@core/services/shared/http.service';
import { ConsumeService } from '@core/services/consume.service';


@Injectable({
  providedIn: 'root'
})
export class ProportionService {

  private urls = {
    proportion: 'proportion',
  };

  constructor(
    private httpService: HttpService,
    private consumeService: ConsumeService,
  ) { }

  getProportions(): Observable<Proportion[]> {
    return this.httpService.get<Proportion[]>(this.urls.proportion).pipe(
      switchMap(proportions => of(proportions).pipe(
        mergeMap(proportion => this.consumeService.getConsumes()),
        map(consumes => consumes.map(consume => consume.id)),
        map(consumes => proportions.filter(proportion => consumes.indexOf(proportion.consume) !== -1)),
      )),
    );
  }

  getProportionsFromBook(book: number): Observable<Proportion[]> {
    return this.getProportions().pipe(
      switchMap(proportions => of(proportions).pipe(
        mergeMap(proportion => this.consumeService.getConsumesFromBook(book)),
        map(consumes => consumes.map(consume => consume.id)),
        map(consumes => proportions.filter(proportion => consumes.indexOf(proportion.consume) !== -1)),
      )),
    );
  }

  getProportion(id: number): Observable<Proportion> {
    return this.httpService.get<Proportion>(`${this.urls.proportion}/${id}`);
  }

  createProportion(proportion: Proportion): Observable<Proportion> {
    return this.httpService.post<Proportion>(this.urls.proportion, proportion);
  }

  updateProportion(id: number, proportion: Proportion): Observable<Proportion> {
    return this.httpService.patch<Proportion>(`${this.urls.proportion}/${id}`, proportion);
  }

  partialUpdateProportion(id: number, proportion: Proportion): Observable<Proportion> {
    return this.httpService.patch<Proportion>(`${this.urls.proportion}/${id}`, proportion);
  }

  deleteProportion(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.proportion}/${id}`);
  }
}
