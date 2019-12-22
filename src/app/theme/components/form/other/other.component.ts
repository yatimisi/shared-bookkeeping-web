import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent {
  @Input() type: string;
  @Input() title: string;
  @Input() readOnly = false;
  @Input() formControl: FormControl;
}
