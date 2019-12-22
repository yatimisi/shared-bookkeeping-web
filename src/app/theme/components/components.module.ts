import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddButtonModule } from './add-button/add-button.module';
import { FormErrorModule } from './form-error/form-error.module';
import { MenuModule } from './menu/menu.module';
import { NavbarModule } from './navbar/navbar.module';
import { TableModule } from './table/table.module';


const COMPONENTS = [
  CommonModule,
  AddButtonModule,
  FormErrorModule,
  MenuModule,
  NavbarModule,
  TableModule,
];

@NgModule({
  imports: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ComponentsModule };
  }
}
