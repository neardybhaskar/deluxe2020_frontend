import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { CommonVariables } from '../commons/common-variables';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  imageToUpload: Array<File>;

  constructor(private commonVariable: CommonVariables,
    private http: HttpClient) { }

  //Modify the file everytime when different image is browsed
  imageChangeEvent(files: any) {
    this.imageToUpload = files.target.files;
  }

  //Upload image
  uploadImage(productId: number, productCategoryId: number)
  {
    let url =
      `${this.commonVariable.URL_PREFIX}/upload/image/${productId}`+
      `/${productCategoryId}`;

    const formData: FormData = new FormData();
    for(var i = 0; i < this.imageToUpload.length; i++) {
      formData.append('file', this.imageToUpload[i], this.imageToUpload[i].name);
    }

    let header = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken'),
      Authorization: localStorage.getItem('authenticate'),
    });

    const req = new HttpRequest('POST', url,formData, {headers: header});

    return this.http.request(req);
  }

  sendImage(productId: number, url: string) {
    
  }
}
