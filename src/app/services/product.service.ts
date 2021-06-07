import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonVariables } from '../commons/common-variables';
import { Product } from '../commons/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private commonVariables: CommonVariables
  ) {}

  // Search product as per given input in search box
  searchedProductList(
    searchText: string,
    thePage: number,
    thePageSize: number
  ): Observable<GetResponseProducts> {
    let url =
      `${this.commonVariables.URL_PREFIX}/products/search/findByNameContaining?name=${searchText}` +
      `&page=${thePage}&size=${thePageSize}`;

    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken'),
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: localStorage.getItem('authenticate'),
    });

    return this.http.get<GetResponseProducts>(url, { headers: headers });
  }

  // Returns all products
  getProductList(): Observable<Product[]> {
    let url = `${this.commonVariables.URL_PREFIX}/products/`;

    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken'),
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: localStorage.getItem('authenticate'),
    });

    return this.http
      .get<GetResponseProducts>(url, { headers: headers })
      .pipe(map((response) => response._embedded.products));
  }

  //Returns the product details as per their id, used when
  //navigating to product-detail page of particular id
  getProductDetails(productId: string): Observable<any> {
    let url = `${this.commonVariables.URL_PREFIX}/product/productCategoryName/${productId}`;

    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken'),
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: localStorage.getItem('authenticate'),
    });

    return this.http
      .get(url, { headers: headers })
      .pipe(map((response) => response));
  }

  // Returns product list as per the product-category
  // i.e for product-category id: 1 it will return all the books
  getProductListAsPerCategory(
    categoryId: string,
    thePage: number,
    thePageSize: number
  ): Observable<GetResponseProducts> {
    let url =
      `${this.commonVariables.URL_PREFIX}/products/search/findByProductCategoryId?category_id=${categoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken'),
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: localStorage.getItem('authenticate'),
    });

    return this.http.get<GetResponseProducts>(url, { headers: headers });
  }

  getProductPaginationList(
    thePage: number,
    thePageSize: number
  ): Observable<GetResponseProducts> {
    let url =
      `${this.commonVariables.URL_PREFIX}/products` +
      `?page=${thePage}&size=${thePageSize}`;

    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken'),
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: localStorage.getItem('authenticate'),
    });

    return this.http.get<GetResponseProducts>(url, { headers: headers });
  }

  addProduct(
    productName: string,
    date: string,
    price: number,
    stock: number,
    productCategory: number,
    productDescription: string,
  ) : Observable<any>{
    let url =
    `${this.commonVariables.URL_PREFIX}/addProduct`;

    let productInfo = {
      productName: productName,
      addedDate: date,
      price: price,
      stock: stock,
      productCategory: productCategory,
      productDescription: productDescription,
    }

    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken'),
      Authorization: localStorage.getItem('authenticate'),
    });
    return this.http.post(url, productInfo, { headers: header }).pipe();
  }
  
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
