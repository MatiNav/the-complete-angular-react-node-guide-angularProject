import { RegisterComponent } from 'src/app/auth/register/register.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalListComponent } from 'src/app/rental/rental-list/rental-list.component';
import { AuthGuard } from 'src/app/common/guards/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
    { path: 'register', component: RegisterComponent, canActivate:[AuthGuard] },
    {path:"", component:LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
