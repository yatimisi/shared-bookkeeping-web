import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ThemeModule } from '@theme/theme.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';

import { BookDetailListComponent } from './detail/list/list.component';


@NgModule({
  imports: [
    ThemeModule,
    BookRoutingModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    BookComponent,
    BookDetailListComponent,
  ],
})
export class BookModule { }
