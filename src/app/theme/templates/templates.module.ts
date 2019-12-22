import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';

const COMPONENTS = [
  ListComponent,
];

@NgModule({
  imports: [CommonModule],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class TemplatesModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: TemplatesModule };
  }
}
