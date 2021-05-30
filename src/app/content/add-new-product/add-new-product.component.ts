import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/commons/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  //For form validation
  newProductForm: FormGroup;

  loggedIn = false;

  //For loading style
  loading = false;
  submitted = false;
  productCategory : ProductCategory[];

  //Check if product added then show added successfully page
  productAdded = false;

  //Check if product already present already
  productNameExist = false;

  //Compare userRole for displaying Add product page
  userRole = "USER";

  constructor(private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private router: Router,
    public uploadImageService: UploadImageService) { }

  ngOnInit(): void {
    //If not authenticated then redirect to login page
    if (localStorage.getItem('xAuthToken') == null) {
      this.router.navigate(['/']);
    }

    this.newProductForm = this.formBuilder.group(
      {
        productname: ['', Validators.required],
        addedDate: ['', Validators.required],
        productprice: ['', Validators.required, Validators.pattern("^[0-9]*$")],
        productquantity: ['', Validators.required],
        productdescription: ['', Validators.required],
        productactive: ['', Validators.required],
        productcategory: ['', Validators.required],
        productimage: ['', Validators.required]
      })

      this.getProductCategory();
      this.userRole = localStorage.getItem("userRole");
  }

  get f() {
    return this.newProductForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.newProductForm.invalid) {
      this.newProductForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.productService.addProduct(
      this.f.productname.value,
      this.f.addedDate.value,
      this.f.productprice.value,
      this.f.productquantity.value,
      this.f.productcategory.value,
      this.f.productdescription.value
    ).pipe(first())
    .subscribe(
      (data) => {
        this.loading = false;
        this.productAdded = true;
        this.uploadImageService.uploadImage(data.id, data.productCategoryId).subscribe(data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.productAdded = false;
        this.productNameExist = true;
      }
    );
  }

  getProductCategory() {
    this.productCategoryService.getProductCategoryList().
    subscribe(
      data => {
        this.productCategory = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  //Navigate to home page when trying to access '/addNewProduct'
  //without ADMIN role
  routeToHomePage() {
    this.router.navigate(['/home']).then(() => {
      location.reload();
    });
  }

}
