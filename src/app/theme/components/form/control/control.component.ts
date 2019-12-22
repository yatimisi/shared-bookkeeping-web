import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  @Input() type: string;
  @Input() title: string;
  @Input() hidden = false;
  @Input() value: string;
  @Input() readOnly = false;
  @Input() formControl: FormControl;

  public previewUrl: any = '';

  fileProgress(fileInput: any) {
    this.formControl.setValue(fileInput.target.files[0] as File);
    this.preview(this.formControl);
  }

  preview(fileData: FormControl) {
    // Show preview
    const mimeType = fileData.value.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // tslint:disable-next-line: prefer-const
    let reader = new FileReader();
    reader.readAsDataURL(fileData.value);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

}
