import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewProductComponent } from './content/add-new-product/add-new-product.component';
import { HomeComponent } from './content/home/home.component';
import { ProductDetailComponent } from './content/product-detail/product-detail.component';
import { ProductListComponent } from './content/product-list/product-list.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  //Moved from registration-routing.module.ts
  {
    path: 'register',
    component: RegistrationComponent,
  },

  //Moved from login-routing.module.ts
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'search/:keyword',
    component: MainLayoutComponent,
    children: [{ path: '', component: ProductListComponent }],
  },
  {
    path: 'products/:productId',
    component: MainLayoutComponent,
    children: [{ path: '', component: ProductDetailComponent }],
  },
  {
    path: 'products',
    component: MainLayoutComponent,
    children: [{ path: '', component: ProductListComponent }],
  },
  {
    path: 'productsAsPerCategory/:categoryId',
    component: MainLayoutComponent,
    children: [{ path: '', component: ProductListComponent }],
  },
  {
    path: 'addNewProduct',
    component: MainLayoutComponent,
    children: [{ path: '', component: AddNewProductComponent }],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
