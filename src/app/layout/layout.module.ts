import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../content/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from '../app-routing.module';
import { ProductListComponent } from '../content/product-list/product-list.component';
import { ProductDetailComponent } from '../content/product-detail/product-detail.component';
import { CommonVariables } from '../commons/common-variables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewProductComponent } from '../content/add-new-product/add-new-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ShoppingCartItemsComponent } from '../content/shopping-cart-items/shopping-cart-items.component';

@NgModule({
  exports: [MainLayoutComponent],
  declarations: [
    MainLayoutComponent,
    SidebarComponent,
    HomeComponent,
    ProductListComponent,
    ProductDetailComponent,
    AddNewProductComponent,
    PageNotFoundComponent,
    ShoppingCartItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FlexLayoutModule,
    MatSidenavModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CommonVariables],
})
export class LayoutModule {}
