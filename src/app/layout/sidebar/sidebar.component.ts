import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/commons/product-category';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  loggedIn = false;
  productCategory: ProductCategory[];

  constructor(
    private authenticationService: AuthenticationService,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    // this.authenticationService
    //   .checkSession()
    //   .pipe()
    //   .subscribe(
    //     (res) => {
    //       this.loggedIn = true;
    //     },
    //     (error) => {
    //       this.loggedIn = false;
    //       console.log(error);
    //     }
    //   );

    this.getProductCategory();
  }

  getProductCategory() {
    this.productCategoryService.getProductCategoryList().subscribe(
      (data) => {
        this.productCategory = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
