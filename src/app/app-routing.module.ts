import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: "../app/auth/auth.module#AuthModule"
  },
  {
    path: "rental",
    loadChildren: "../app/rental/rental.module#RentalModule"
  },
  {
    path: '',
    redirectTo: 'rental',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'rental',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
