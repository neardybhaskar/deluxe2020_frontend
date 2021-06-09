import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonVariables } from '../commons/common-variables';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private http: HttpClient,
    private commonVariables: CommonVariables
  ) { }

  onAddToCart(quantity: number, productId: any) {
    let url = `${this.commonVariables.URL_PREFIX}/cart/add`;
    let cartInfo = {
      quantity: quantity,
      productId: productId,
      userId: localStorage.getItem('userId'),
    };
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken'),
      Authorization: localStorage.getItem('authenticate'),
    });
    return this.http.post(url, cartInfo, { headers: tokenHeader }).pipe();
  }
}
