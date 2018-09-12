import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalComponent } from './rental.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalListComponent } from 'src/app/rental/rental-list/rental-list.component';
import { AuthGuard } from 'src/app/shared/auth-guard.service';

const routes: Routes = [
    {path: '',
    component: RentalComponent,
     children:[
       {path: '', component: RentalListComponent, canActivate:[AuthGuard]},
       {path: ':rentalId', component: RentalDetailComponent, canActivate:[AuthGuard]}
     ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalRoutingModule { }
