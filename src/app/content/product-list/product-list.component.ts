import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/commons/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  loggedIn = false;
  searchMode: boolean;
  productSearchAsCategory: boolean;
  products: Product[];

  page = 1;
  pageSize = 15;
  totalElements = 12;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.authenticationService
      .checkSession()
      .pipe()
      .subscribe(
        (res) => {
          this.loggedIn = true;
        },
        (error) => {
          this.loggedIn = false;
          console.log(error);
        }
      );

    //If not authenticated then redirect to login page
    if (localStorage.getItem('xAuthToken') == null) {
      this.router.navigate(['/']);
    }
    this.getProductList();
  }

  getProductList() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.productSearchAsCategory = this.route.snapshot.paramMap.has(
      'categoryId'
    );
    if (this.searchMode) {
      this.getSearchBookList(this.route.snapshot.paramMap.get('keyword'));
    } else if (this.productSearchAsCategory) {
      this.getProductAsPerCategory(
        this.route.snapshot.paramMap.get('categoryId')
      );
    } else {
      this.getAllProducts();
    }
  }

  //Returns all the products of all categories
  getAllProducts() {
    this.productService
      .getProductPaginationList(this.page - 1, this.pageSize)
      .subscribe(
        (data) => {
          this.products = data._embedded.products;
          this.page = data.page.number + 1;
          this.pageSize = data.page.size;
          this.totalElements = data.page.totalElements;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //Returns list of products matching the searchbox
  getSearchBookList(stringName: string) {
    this.productService
      .searchedProductList(stringName, this.page - 1, this.pageSize)
      .subscribe(
        (data) => {
          this.products = data._embedded.products;
          this.page = data.page.number + 1;
          this.pageSize = data.page.size;
          this.totalElements = data.page.totalElements;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //Returns list of products of particular category
  getProductAsPerCategory(categoryId: string) {
    this.productService
      .getProductListAsPerCategory(categoryId, this.page - 1, this.pageSize)
      .subscribe(
        (data) => {
          this.products = data._embedded.products;
          this.page = data.page.number + 1;
          this.pageSize = data.page.size;
          this.totalElements = data.page.totalElements;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
