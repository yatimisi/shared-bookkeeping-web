import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BookComponent } from './book.component';
import { BookDetailListComponent } from './detail/list/list.component';


const routes: Routes = [
  {
    path: ':bookId',
    component: BookComponent,
    children: [
      {
        path: 'detail',
        children: [
          { path: 'list', component: BookDetailListComponent },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: 'detail', pathMatch: 'full' },
      { path: '**', redirectTo: 'detail', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule { }
