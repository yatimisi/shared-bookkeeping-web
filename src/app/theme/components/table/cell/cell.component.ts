import { Component, Input, HostBinding } from '@angular/core';

import { HeaderSetting } from '@core/models/header-setting.model';


@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  @Input() header: HeaderSetting;
  @Input() mobile = false;
  @HostBinding('style.flex-basis') get basisPercentage() {
    return `${this.header.percentage || '0'}%`;
  }
  @HostBinding('style.overflow') overflow = 'auto';
}
