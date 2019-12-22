import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-book',
  template: `
    <div class="container-fluid">
      <div class="row-fluid">
        <div class="col-xs-12">
          <nav class="navbar navbar-expand-sm">

            <!--Left Logo-->

            <mat-button-toggle-group name="fontStyle" aria-label="Font Style">
              <mat-button-toggle value="detail" (click)="conversionRouter('detail')">記帳細項</mat-button-toggle>
              <!-- <mat-button-toggle value="statistical" (click)="conversionRouter('statistical')">統計</mat-button-toggle> -->
              <mat-button-toggle value="repay" (click)="conversionRouter('repay')">還款</mat-button-toggle>
            </mat-button-toggle-group>


            <!--Right Features-->
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
              <div class="nav-item">
                <!-- <button class="btn btn-primary m-2 my-sm-0" type="button" (click)="conversionRouter('categories')">分類</button> -->
                <!-- <button class="btn btn-info m-2 my-sm-0" type="button" (click)="conversionRouter('users')">使用者</button> -->
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./book.components.scss'],
})
export class BookComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  conversionRouter(load: string) {
    this.router.navigate([load], { relativeTo: this.route });
  }
}
