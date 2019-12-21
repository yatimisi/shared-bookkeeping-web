import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap, mergeMap, map } from 'rxjs/operators';

import { Category } from '@core/models/category.model';
import { HttpService } from '@core/services/shared/http.service';
import { BookService } from '@core/services/book.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories$: Observable<Category[]>;

  private urls = {
    categories: 'categories',
  };

  constructor(
    private httpService: HttpService,
    private bookService: BookService,
  ) { }

  getCategories(): Observable<Category[]> {
    // return this.httpService.get<Category[]>(this.urls.categories);

    // mock
    return this.httpService.get<Category[]>(this.urls.categories).pipe(
      switchMap(categories => of(categories).pipe(
        mergeMap(category => this.bookService.getBooks()),
        map(books => books.map(book => book.id)),
        map(books => categories.filter(category => books.indexOf(category.book) !== -1)),
      )),
    );
  }

  getCategoriesFromBook(book: number): Observable<Category[]> {
    this.categories$ = this.getCategories().pipe(
      map(categories => categories.filter(category => category.book === book)),
      shareReplay(1),
    );
    return this.categories$;
  }

  getCategory(id: number): Observable<Category> {
    return this.httpService.get<Category>(`${this.urls.categories}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpService.post<Category>(this.urls.categories, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.httpService.patch<Category>(`${this.urls.categories}/${id}`, category);
  }

  partialUpdateCategory(id: number, category: Category): Observable<Category> {
    return this.httpService.patch<Category>(`${this.urls.categories}/${id}`, category);
  }

  deleteCategory(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.categories}/${id}`);
  }
}
