import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonVariables } from '../commons/common-variables';
import { ProductCategory } from '../commons/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(
    private http: HttpClient,
    private commonVariables: CommonVariables
  ) {}

  getProductCategoryList(): Observable<ProductCategory[]> {
    let url = `${this.commonVariables.URL_PREFIX}/productCategories`;

    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken'),
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: localStorage.getItem('authenticate'),
    });

    return this.http
      .get<GetResponseProducts>(url, { headers: headers })
      .pipe(map((response) => response._embedded.productCategories));
  }

}

interface GetResponseProducts {
  _embedded: {
    productCategories: ProductCategory[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
