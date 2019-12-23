import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, shareReplay, map } from 'rxjs/operators';

import { Category } from '@core/models/category.model';
import { User } from '@core/models/user.model';
import { Consume } from '@core/models/consume.model';
import { ConsumeService } from '@core/services/consume.service';
import { SwalService } from '@core/services/swal.service';
import { UserService } from '@core/services/user.service';
import { CategoryService } from '@core/services/category.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class BookDetailDetailComponent implements OnInit {

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

    this.consumeService.getConsume(+(this.route.snapshot.paramMap.get('consumeId')))
    .subscribe(result => {
      this.buildForm(result);
    });
  }

  buildForm(data = {} as Consume): void {
    this.form = this.formBuilder.group({
      name: [data.name, [Validators.required, Validators.maxLength(50)]],
      note: [data.note, []],
      creator: [data.creator, [Validators.required]],
      category: [data.category, [Validators.required]],
      consumeAt: [data.consumeAt, [Validators.required]],
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

      this.consumeService.partialUpdateConsume(+(this.route.snapshot.paramMap.get('consumeId')), this.form.value).pipe(
        delay(1000)
      ).subscribe(
        result => {
          this.swalService.alert('修改完成', 'success');
          this.router.navigate(['../', result.id, 'detail'], { relativeTo: this.route });
        },
        err => {
          this.swalService.alert('修改失敗', 'error', err);
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
