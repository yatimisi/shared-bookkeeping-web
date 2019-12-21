import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap, mergeMap, map } from 'rxjs/operators';

import { Authority } from '@core/models/authority.model';
import { HttpService } from '@core/services/shared/http.service';
import { UserService } from '@core/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  authorities$: Observable<Authority[]>;

  private urls = {
    authorities: 'authorities',
  };

  constructor(
    private httpService: HttpService,
    private userService: UserService,
  ) { }

  getAuthorities(): Observable<Authority[]> {
    // return this.httpService.get<Authority[]>(this.urls.authorities);

    // mock
    return this.httpService.get<Authority[]>(this.urls.authorities).pipe(
      switchMap(authorities => of(authorities).pipe(
        mergeMap(authority => this.userService.me()),
        map(me => authorities.filter(authority => me.id === authority.user)),
        map(dataset => dataset.map(data => data.book)),
        map(dataset => authorities.filter(authority => dataset.indexOf(authority.book) !== -1)),
      )),
      shareReplay(1)
    );
  }

  getAuthoritiesFromBook(book: number): Observable<Authority[]> {
    this.authorities$ = this.getAuthorities().pipe(
      map(authorities => authorities.filter(authority => authority.book === book)),
      shareReplay(1),
    );
    return this.authorities$;
  }

  getAuthority(id: number): Observable<Authority> {
    return this.httpService.get<Authority>(`${this.urls.authorities}/${id}`);
  }

  createAuthority(authority: Authority): Observable<Authority> {
    return this.httpService.post<Authority>(this.urls.authorities, authority);
  }

  updateAuthority(id: number, authority: Authority): Observable<Authority> {
    return this.httpService.patch<Authority>(`${this.urls.authorities}/${id}`, authority);
  }

  partialUpdateAuthority(id: number, authority: Authority): Observable<Authority> {
    return this.httpService.patch<Authority>(`${this.urls.authorities}/${id}`, authority);
  }

  deleteAuthority(id: number): Observable<unknown> {
    return this.httpService.delete(`${this.urls.authorities}/${id}`);
  }
}
