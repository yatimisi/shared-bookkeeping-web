import { Component, Input, HostBinding } from '@angular/core';

import { HeaderSetting } from '@core/models/header-setting.model';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent {
  @Input() header: HeaderSetting;
  @HostBinding('style.flex-basis') get basisPercentage() {
    return `${this.header.percentage || '0'}%`;
  }
}
