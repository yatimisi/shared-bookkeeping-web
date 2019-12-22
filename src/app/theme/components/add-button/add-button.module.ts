import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material';
import { AddButtonComponent } from './add-button.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [AddButtonComponent],
  declarations: [AddButtonComponent],
})
export class AddButtonModule { }
