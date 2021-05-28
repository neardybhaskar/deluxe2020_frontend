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

@NgModule({
  exports: [MainLayoutComponent],
  declarations: [
    MainLayoutComponent,
    SidebarComponent,
    HomeComponent,
    ProductListComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FlexLayoutModule,
    MatSidenavModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
  ],
  providers: [CommonVariables],
})
export class LayoutModule {}
