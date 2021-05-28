import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Product } from '../commons/product';
import { CommonVariables } from '../commons/common-variables';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private commonVariables: CommonVariables
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username, password): Observable<any> {
    let url = `${this.commonVariables.URL_PREFIX}/${username}/token`;
    let encodedCredentials = btoa(username + ':' + password);
    let basicHeader = 'Basic ' + encodedCredentials;
    localStorage.setItem('authenticate', basicHeader);
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: basicHeader,
    });
    //return this.http.get(url);
    //return this.http.get<GetResponse>(url).pipe( map(response => response._embedded.users));
    return this.http.get(url, { headers: headers });
    // return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
    //     .pipe(map(user => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.currentUserSubject.next(user);
    //         return user;
    //     }));
  }

  checkSession(): Observable<any> {
    let url = `${this.commonVariables.URL_PREFIX}/checkSession`;
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken'),
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: localStorage.getItem('authenticate'),
    });
    // var headers = {
    //   headers: new HttpHeaders()
    //     .set('Set-Cookie',  `JSESSIONID=${localStorage.getItem('xAuthToken')}; Path=/; HttpOnly`)
    // }
    return this.http.get(url, { headers: headers });
  }

  logout(): Observable<any> {
    let url = `${this.commonVariables.URL_PREFIX}/userLogout`;
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken'),
    });

    return this.http.post(url, '', { headers: headers });
  }

  register(firstname, lastname, email, password): Observable<any> {
    let url = `${this.commonVariables.URL_PREFIX}/registerUser`;
    let userInfo = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    let tokenHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, userInfo, { headers: tokenHeader }).pipe();
  }

  getProductList(): Observable<Product[]> {
    let url = `${this.commonVariables.URL_PREFIX}/products/search/findByProductCategoryId?category_id=1`;

    return this.http
      .get<GetResponse>(url)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
