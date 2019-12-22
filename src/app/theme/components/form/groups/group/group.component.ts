import { Component, Input, HostBinding } from '@angular/core';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  @Input() title: string;
  @Input() lg = '';
  @Input() md = '12';
  @Input() sm = '12';
  @Input() min = '12';
  @Input() align = 'left';
  @Input() margin = '0 0 0 0';

  @HostBinding('class') get basisClass() {
    return `${(this.lg !== '' ? 'col-lg-' + this.lg : '')} col-md-${this.md} col-sm-${this.sm} col-${this.min} px-1`;
  }
  @HostBinding('style.text-align') get basisAlign() {
    return this.align;
  }
  @HostBinding('style.margin') get basisMargin() {
    return this.margin;
  }

}
