import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/commons/product';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { AppConst } from 'src/app/commons/constant/app-const';
import { ProductCategory } from 'src/app/commons/product-category';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  loggedIn = false;
  serverPath = AppConst.serverPath;
  productCategory: ProductCategory = new ProductCategory();
  quantity: number;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private _location: Location,
    private shoppingCartService: ShoppingCartService
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
          //Fetch product from product and productCategoryName json object
          this.products = data['product'];

          //Fetch productCategoryName from product and productCategoryName json object
          this.productCategory = data['productCategory'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  navigateToBackPage() {
    this._location.back();
  }

  onAddToCart() {
    this.shoppingCartService.onAddToCart(this.quantity, this.products.id)
    .subscribe(
      (data) => {

      },
      (error) => {
        console.log(error);
      }
    );
  }
}
