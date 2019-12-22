import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material';
import { PipesModule } from '@theme/pipes/pipes.module';
import { ControlComponent } from './control/control.component';
import { OtherComponent } from './other/other.component';
import { FormComponent } from './form.component';
import { FormErrorComponent } from '../form-error/form-error.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './groups/group/group.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  exports: [
    ControlComponent,
    FormComponent,
    FormErrorComponent,
    GroupsComponent,
    GroupComponent,
    OtherComponent,
  ],
  declarations: [
    ControlComponent,
    FormComponent,
    FormErrorComponent,
    GroupsComponent,
    GroupComponent,
    OtherComponent,
  ],
})
export class FormModule { }
