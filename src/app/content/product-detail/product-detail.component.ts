import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/commons/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  loggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private _location: Location
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

    this.loadProductDetails();
  }

  productId: string;
  products: Product = new Product();

  loadProductDetails() {
    this.productService
      .getProductDetails(this.route.snapshot.paramMap.get('productId'))
      .subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  navigateToBackPage() {
    this._location.back();
  }
}
