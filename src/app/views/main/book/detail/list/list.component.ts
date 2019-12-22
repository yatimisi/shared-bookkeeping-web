import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, shareReplay, switchMap, mergeMap, toArray } from 'rxjs/operators';

import { ConsumeService } from '@core/services/consume.service';
import { BookService } from '@core/services/book.service';
import { UserService } from '@core/services/user.service';
import { ListComponent } from '@theme/templates/list/list.component';
import { from } from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BookDetailListComponent extends ListComponent implements OnInit {

  constructor(
    private consumeService: ConsumeService,
    private bookService: BookService,
    private userService: UserService,
    protected route: ActivatedRoute,
    protected router: Router,
  ) {
    super(route, router);
  }

  ngOnInit() {
    // Table headers setting
    this.headers = {
      id: { percentage: 15, title: '編號' },
      name: { percentage: 30, title: '細項' },
      creator: { percentage: 25, title: '付款人' },
      consumeAt: { percentage: 20, title: '付款時間' },
      feature: { percentage: 10 },
    };

    this.source$ = this.consumeService.getConsumesFromBook(this.bookService.nowBook).pipe(
      switchMap(consumes => from(consumes).pipe(

        mergeMap(consume => this.userService.getUsers().pipe(
          map(users => users.filter(user => user.id === consume.creator).pop()),
        )),
        toArray(),

        // Join
        map(users =>
          consumes.map((consume, index) => {
            return {
              id: consume.id,
              consumeAt: consume.consumeAt,
              creator: users[consume.creator].username,
              name: consume.name,
            };
          })
        ),
      )),
      map(consumes => consumes.sort((x, y) => x.id < y.id ? -1 : 1)),
      shareReplay(1),
    );
  }
}
