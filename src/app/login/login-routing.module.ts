import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
