import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalComponent } from './rental.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalListComponent } from 'src/app/rental/rental-list/rental-list.component';
import { AuthGuard } from 'src/app/common/guards/auth-guard.service';
import { RentalSearchComponent } from 'src/app/rental/rental-search/rental-search.component';
import { RentalCreateComponent } from 'src/app/rental/rental-create/rental-create.component';

const routes: Routes = [
    {path: '',
    component: RentalComponent,
     children:[
       {path: '', component: RentalListComponent, canActivate:[AuthGuard]},
       {path: 'new', component:RentalCreateComponent, canActivate:[AuthGuard]},
       {path: ':rentalId', component: RentalDetailComponent, canActivate:[AuthGuard]},
       {path: ':city/homes', component:RentalSearchComponent},
     ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalRoutingModule { }
