import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TableComponent } from './table.component';
import { HeadComponent } from './head/head.component';
import { RowComponent } from './row/row.component';
import { CellComponent } from './cell/cell.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  exports: [
    TableComponent,
    HeadComponent,
    RowComponent,
    CellComponent,
  ],
  declarations: [
    TableComponent,
    HeadComponent,
    RowComponent,
    CellComponent,
  ],
})
export class TableModule { }
