import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductCategory } from 'src/app/commons/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  newProductForm: FormGroup;
  loading = false;
  submitted = false;
  productCategory : ProductCategory[];
  productAdded = false;
  productNameExist = false;
  userRole = "USER";

  constructor(private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
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

  routeToHomePage() {
    this.router.navigate(['/home']).then(() => {
      location.reload();
    });
  }

}
