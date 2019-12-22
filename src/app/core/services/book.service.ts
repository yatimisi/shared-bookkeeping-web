import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap, mergeMap, map } from 'rxjs/operators';

import { Book } from '@core/models/book.model';
import { HttpService } from '@core/services/shared/http.service';
import { AuthorityService } from '@core/services/authority.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  books$: Observable<Book[]>;
  nowBook$: Observable<Book>;
  nowBook = 2;

  private urls = {
    books: 'accountbooks',
  };

  constructor(
    private httpService: HttpService,
    private authorityService: AuthorityService,
  ) { }

  getBooks(): Observable<Book[]> {
    this.books$ = this.httpService.get<Book[]>(this.urls.books).pipe(shareReplay(1));

    // mock
    this.books$ = this.books$.pipe(
      switchMap(books => of(books).pipe(
        mergeMap(book => this.authorityService.getAuthorities()),
        map(authorities => authorities.map(authority => authority.book)),
        map(authorities => books.filter(book => authorities.indexOf(book.id) !== -1)),
      )),
    );
    return this.books$;
  }

  getBook(id: number): Observable<Book> {
    return this.httpService.get<Book>(`${this.urls.books}/${id}`).pipe(shareReplay(1));
  }

  createBook(book: Book): Observable<Book> {
    return this.httpService.post<Book>(this.urls.books, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.httpService.patch<Book>(`${this.urls.books}/${id}`, book);
  }

  partialUpdateBook(id: number, book: Book): Observable<Book> {
    return this.httpService.patch<Book>(`${this.urls.books}/${id}`, book);
  }

  deleteBook(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.books}/${id}`);
  }
}
