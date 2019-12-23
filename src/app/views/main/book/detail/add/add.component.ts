import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, shareReplay, map } from 'rxjs/operators';

import { Category } from '@core/models/category.model';
import { User } from '@core/models/user.model';
import { Consume } from '@core/models/consume.model';
import { Proportion } from '@core/models/proportion.model';
import { ConsumeService } from '@core/services/consume.service';
import { SwalService } from '@core/services/swal.service';
import { UserService } from '@core/services/user.service';
import { CategoryService } from '@core/services/category.service';
import { ProportionService } from '@core/services/proportion.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class BookDetailAddComponent implements OnInit {

  form: FormGroup;
  sending = false;
  users$: Observable<User[]>;
  categories$: Observable<Category[]>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private consumeService: ConsumeService,
    private categoryService: CategoryService,
    private proportionService: ProportionService,
    private swalService: SwalService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.users$ = this.userService.getUsers().pipe(
      map(users => users.sort((x, y) => x.id < y.id ? -1 : 1)),
      shareReplay(1),
    );

    this.categories$ = this.categoryService.getCategories().pipe(
      map(users => users.sort((x, y) => x.id < y.id ? -1 : 1)),
      shareReplay(1),
    );
  }

  buildForm(data = {} as Consume): void {
    this.form = this.formBuilder.group({
      name: [data.name, [Validators.required, Validators.maxLength(50)]],
      note: [data.note, [Validators.required]],
      creator: [data.creator, [Validators.required]],
      category: [data.category, [Validators.required]],
      consumeAt: [data.consumeAt, [Validators.required]],
      fee: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmin(): void {
    if (this.form.invalid) {
      this.swalService.alert('請再次確認.', 'warning');
      Object.keys(this.form.controls)
        .map(key => this.form.get(key).markAsTouched());
      return;
    }

    this.sending = true;

    this.swalService.swal.fire({
      icon: 'question',
      title: '是否確認送出',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      confirmButtonText: '確認',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      heightAuto: false
    }).then((send) => {

      if (send.dismiss) {
        this.sending = false;
        return;
      }

      this.consumeService.createConsume(this.form.value).pipe(
        delay(1000)
      ).subscribe(
        result => {
          const proportions = document.getElementsByName('proportions');
          const array = [];

          proportions.forEach(proportion => {
            if (proportion.checked) {
              array.push(proportion);
            }
          });

          array.forEach(data => this.proportionService.createProportion({
            username: data.value,
            // tslint:disable-next-line: no-string-literal
            fee: this.form.controls['fee'].value / array.length,
            consume: result.id,
            payment: 0,
          } as Proportion).subscribe());

          this.swalService.alert('新增完成', 'success');
          this.router.navigate(['../', result.id, 'detail'], { relativeTo: this.route });
        },
        err => {
          this.swalService.alert('新增失敗', 'error', err);
          this.sending = false;
        },
        () => { }
      );

    });
  }

  onBack(): void {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
