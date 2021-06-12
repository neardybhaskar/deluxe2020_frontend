import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonVariables } from '../commons/common-variables';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartCount: number = 0;


  constructor(
    private http: HttpClient,
    private commonVariables: CommonVariables,
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
    return this.http.post(url, cartInfo, { headers: tokenHeader });
  }

  getCartItemCount(uId: any) {
    let url = `${this.commonVariables.URL_PREFIX}/cartItem/getQuantity`;

    let userId = {
      userId: uId,
    }
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken'),
      Authorization: localStorage.getItem('authenticate'),
    });
    return this.http.post(url, userId, {headers: header});
  }

}
