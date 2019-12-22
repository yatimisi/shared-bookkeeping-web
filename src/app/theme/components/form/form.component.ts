import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Output() event = new EventEmitter();

  onSubmit() {
    this.event.emit();
  }
}
